"use server";
import { githubRepoLoader, loadGithubRepo } from "@/lib/github-loader";
import { getConvexClient } from "@/lib/convex";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

const convexClient = getConvexClient();

export const indexGithubRepo = async (
  userId: string,
  projectId: string,
  githubUrl: string,
  branch: string,
  githubToken?: string
) => {
  console.log("Loading github repo");
  //const data = await githubRepoLoader(githubUrl,githubToken);
  const docs = await loadGithubRepo(githubUrl, branch, githubToken);
  console.log("Loading files...");
  await Promise.all(
    docs.map(async (doc, index) => {
      console.log(
        `${index} . saving the file : ${doc.metadata.source.toLowerCase()}`
      );
      return await convexClient.mutation(
        api.sourceCodeEmbedding.saveCodeEmbedding,
        {
          fileName: doc.metadata.source.toLowerCase(),
          projectId: projectId as Id<"project">,
          sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
          userId,
        }
      );
    })
  );
};
