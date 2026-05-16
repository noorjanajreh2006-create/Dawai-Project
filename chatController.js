import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function chatReply(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: "Gemini API key is missing",
      });
    }

    const prompt = `
      You are Dawai Assistant, a helpful assistant for a medication reminder app.
      Help users understand how to use the app: medications, reminders, dashboard, stats, and profile.
      Do not give medical diagnosis or emergency medical advice.
      Keep answers short, clear, and friendly.

      User question:${message} `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      reply: response.text || "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error("Gemini error:", error.message);

    res.status(500).json({
      message: "Failed to connect to Dawai Assistant",
    });
  }
}