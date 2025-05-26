import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

function chunkString(str: string, size: number) {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

export async function summarizeCode(doc: Document) {
  const summarizeModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
    systemInstruction: `You are an AI software engineer guiding a junior developer trying to explain the given file:{filename}\n\n by the given code snippets : {chunk}\n\n.DON'T DO ANYTHING, ONLY SUMMARIZE the given code snippets WITHIN NO MORE THAN 10 WORDS`,
  });

  try {
    const maxChunksPerRequest = 3; // To stay within API limits
    const chunkSize = 200; // Ensures we don’t exceed input token limits

    //remove comments and blank lines
    const code = doc.pageContent
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*[\r\n]/gm, "");
    // Step 1: Break document into smaller chunks
    const codeChunks = chunkString(code.trim().slice(0, 8000), chunkSize);

    // Step 2: Create batch requests (each batch = 5 chunks max)
    const chunkBatches = [];
    for (let i = 0; i < codeChunks.length; i += maxChunksPerRequest) {
      chunkBatches.push(codeChunks.slice(i, i + maxChunksPerRequest));
    }

    // Step 3: Process each batch separately
    const summaries = [];
    for (const batch of chunkBatches) {
      try {
        const prompt = `file name: "${doc.metadata.source.trim()}".code snippets:\n${batch.join("").trim()}`;
        const response = await summarizeModel.generateContent([prompt.trim()]);
        summaries.push(response.response.text());
      } catch (err) {
        console.error("Error processing batch:", err);
        continue; // Skip failed batch, continue with others
      }
    }

    return summaries.join(" ");
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("Rate limit exceeded : ", error);
      // throw new Error("Rate Limit exceeded");
    }
    return " ";
  }
}

export async function generateEmbedding(summary: string) {
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const result = model.embedContent(summary.trim());
  const embedding = (await result).embedding;
  // console.log(embedding.values);
  return embedding.values;
}

export async function summarizeDocument(docText: string) {
  const summarizeModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
    systemInstruction: `You are a document summarizer to generate concise, engaging, easy-to-read summaries of documents.`,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
    },
  });

  try {
    const prompt = `Transform this document into ONLY one engaging, easy-to-read summary with contextually relevant emojis and plain text format (DO NOTHING ELSE) :\n\n${docText}`;
    const result = await summarizeModel.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("Rate limit exceeded : ", error);
      // throw new Error("Rate Limit exceeded");
    }

    console.error("Gemini Document Summarizer error : ", error);
    return " ";
  }
}

export async function generateBulletSummary(docText: string) {
  const summarizeModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
    systemInstruction: `You are a study assistant that converts educational content into well-structured, easy-to-understand bullet points.`,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1800,
    },
  });

  try {
    const prompt = `Convert the following study material into clear, descriptive bullet points that help students learn better. Each bullet point should capture a key idea, fact, or explanation. Use plain text formatting and make it easy to scan and remember:\n${docText}`;

    const result = await summarizeModel.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("Rate limit exceeded: ", error);
    }

    console.error("Gemini Bullet Summary error: ", error);
    return " ";
  }
}

export async function generateDocDescription(summary: string) {
  const descriptionGenrativeModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001",
    systemInstruction:
      "You are an assistant that generates concise, plain-text descriptions for documents.",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
    },
  });

  try {
    const prompt = `Create ONLY one plain-text description (max 30 words) from the following summary (DO NOTHING ELSE):\n\n${summary}`;
    const result = await descriptionGenrativeModel.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("Rate limit exceeded : ", error);
      // throw new Error("Rate Limit exceeded");
    }

    console.error("Gemini Document Description generator error : ", error);
    return " ";
  }
}
