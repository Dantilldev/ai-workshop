import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowrd" });
  }
  
  const { prompt } = req.body;

  console.log("prompt", prompt);

  const result = await model.generateContent(prompt);
  const answerText = result.response.text();

  console.log("answerText", answerText);

  return res.status(200).json({ answer: answerText });
}