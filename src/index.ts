import Together from "together-ai";
import fs from "fs";

function extractLatexCode(content) {
    const latexMatch = content.match(/```latex\n([\s\S]*?)\n```/);
    if (latexMatch && latexMatch[1]) {
      return latexMatch[1].trim();
    }
    return content;
  }

export async function img2latex({
  filePath,
  apiKey = process.env.TOGETHER_API_KEY,
  model = "Llama-3.2-90B-Vision",
}: {
  filePath: string;
  apiKey?: string;
  model?: "Llama-3.2-90B-Vision" | "Llama-3.2-11B-Vision" | "free";
}) {
  const visionLLM =
    model === "free"
      ? "meta-llama/Llama-Vision-Free"
      : `meta-llama/${model}-Instruct-Turbo`;

  const together = new Together({
    apiKey,
  });

  let finalLatex = await getLatex({ together, visionLLM, filePath });
  finalLatex = extractLatexCode(finalLatex)
  return finalLatex;
}

async function getLatex({
  together,
  visionLLM,
  filePath,
}: {
  together: Together;
  visionLLM: string;
  filePath: string;
}) {
  const systemPrompt = `Convert the provided image into LaTeX code.

  Requirements:

  - Output only the LaTeX code, without any introductory text, explanations, or comments.
  - Include all necessary LaTeX packages in the preamble (e.g., amsmath for mathematical content).
  - Accurately represent all text, equations, tables, figures, and formatting from the document (if they exist).
  - Do not add any additional comments or explanations or notes. Do not start with "Answer:" or "Code:". Return only the LaTeX code itself.
`;
  

  const finalImageUrl = isRemoteFile(filePath)
    ? filePath
    : `data:image/jpeg;base64,${encodeImage(filePath)}`;

  const output = await together.chat.completions.create({
    model: visionLLM,
    messages: [
      {
        role: "user",
        // @ts-expect-error
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: finalImageUrl,
            },
          },
        ],
      },
    ],
  });

  return output.choices[0].message.content;
}

function encodeImage(imagePath: string) {
  const imageFile = fs.readFileSync(imagePath);
  return Buffer.from(imageFile).toString("base64");
}

function isRemoteFile(filePath: string): boolean {
  return filePath.startsWith("http://") || filePath.startsWith("https://");
}