import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Generates a creative description for a project based on an uploaded image.
 * Uses Gemini 3 Flash for fast multimodal understanding.
 */
export const generateProjectDescription = async (
  imageBase64: string,
  projectTitle: string
): Promise<string> => {
  try {
    // Initialize the Gemini API client lazily to prevent top-level crashes 
    // if the environment variable is missing during the initial app load.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Remove the data URL prefix if present (e.g., "data:image/png;base64,")
    const base64Data = imageBase64.split(",")[1] || imageBase64;
    const mimeType = imageBase64.substring(
      imageBase64.indexOf(":") + 1,
      imageBase64.indexOf(";")
    );

    const prompt = `You are a creative copywriter for a portfolio website. 
    Write a short, engaging, and professional description (max 60 words) for a project titled "${projectTitle}".
    Base the description on the visual details provided in the image. 
    Focus on the design, features, or potential tech stack visible.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: mimeType || "image/jpeg",
              data: base64Data,
            },
          },
        ],
      },
    });

    return response.text?.trim() || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate description with Gemini.");
  }
};