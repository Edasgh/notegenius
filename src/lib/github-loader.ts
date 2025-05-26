"use server";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemini";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});


export async function generateEmbeddings(docs: Document[]) {
  // Define a set of file extensions to skip
  const ignoredExtensions = new Set([
    ".svg",
    ".ico",
    ".jpg",
    ".jpeg",
    ".wav",
    ".webp",
    ".png",
    ".gif",
    ".avif",
    ".mp3",
    ".mp4",
    ".lock",
    ".lockb",
    ".gitignore",
    ".env",
    ".local",
  ]);

  return await Promise.all(
    docs
      .filter((doc) => {
        const fileName = doc.metadata.source.toLowerCase();

        // Skip files with unwanted extensions or exact file matches
        for (const ext of ignoredExtensions) {
          if (fileName.endsWith(ext)) {
            return false;
          }
        }

        // Skip files with specific patterns (like -lock.json)
        if (fileName.includes("-lock.json")) return false;

        return true;
      })
      .map(async (doc) => {
        const summary = await summarizeCode(doc);
        if (summary.trim() === "") {
          return {
            summary,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source,
          };
        }
        const embedding = await generateEmbedding(summary);
        return {
          summary,
          embedding,
          sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
          fileName: doc.metadata.source,
        };
      })
  );
}


export async function loadGithubRepo(
  githubUrl: string,
  branch: string,
  githubToken?: string
) {
  const loader = new GithubRepoLoader(githubUrl, {
   // accessToken: githubToken || process.env.GITHUB_TOKEN,
    branch,
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
      "README.md",
    ],
    ignorePaths: [".gitignore", ".env", "favicon.ico"],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  return docs;
}


export async function githubRepoLoader(
  githubUrl: string,
  githubToken?: string
) {
  const [owner, repo] = githubUrl.split("/").slice(3, 5);
  const response = await octokit.request(
    `GET /repos/${owner}/${repo}/contents/`,
    {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const files = response.data;
  console.log("files : ", files);
  for (const file of files) {
    console.log(file._links);
  }
}
