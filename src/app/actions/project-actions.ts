"use server";
import { generateEmbeddings, loadGithubRepo } from "@/lib/github-loader";
import { getConvexClient } from "@/lib/convex";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";

const convexClient = getConvexClient();

export const indexGithubRepo = async (
  userId: string,
  projectId: string,
  githubUrl: string,
  branch: string,
  githubToken?: string
) => {
  console.log("Loading github repo");
  const docs = await loadGithubRepo(githubUrl, branch, githubToken);
  console.log("Loading embeddings");
  const allEmbeddings = await generateEmbeddings(docs);

  await Promise.all(
    allEmbeddings.map(async (embedding, index) => {
      console.log(`${index} . embedding the file : ${embedding.fileName}`);
      if (embedding.embedding === undefined || embedding.embedding === null) {
        return await convexClient.mutation(
          api.sourceCodeEmbedding.saveCodeEmbedding,
          {
            userId,
            projectId: projectId as Id<"project">,
            fileName: embedding.fileName,
            sourceCode: embedding.sourceCode,
            summary: embedding.summary,
          }
        );
      }

      return await convexClient.mutation(
        api.sourceCodeEmbedding.saveCodeEmbedding,
        {
          userId,
          projectId: projectId as Id<"project">,
          fileName: embedding.fileName,
          sourceCode: embedding.sourceCode,
          summary: embedding.summary,
          summaryEmbedding: embedding.embedding,
        }
      );
    })
  );
};
