import { GoogleGenAI, Type } from "@google/genai";
import { VideoMetadata } from "../types";

// Fix: Always use process.env.API_KEY directly in the named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractVideoInfo = async (url: string): Promise<VideoMetadata> => {
  const response = await ai.models.generateContent({
    // Fix: Using gemini-3-pro-preview for complex text analysis tasks like URL-based metadata extraction.
    model: "gemini-3-pro-preview",
    contents: `Analyze this video URL and return metadata in JSON format. If it's a popular social platform (YouTube, TikTok, Instagram, Twitter/X), provide realistic metadata based on common patterns if you can't reach the live site. URL: ${url}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          thumbnail: { type: Type.STRING },
          duration: { type: Type.STRING },
          platform: { type: Type.STRING },
          resolutionOptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          description: { type: Type.STRING }
        },
        required: ["title", "thumbnail", "duration", "platform", "resolutionOptions"]
      },
    },
  });

  try {
    // Fix: Access .text property directly instead of calling it as a method.
    const data = JSON.parse(response.text || '{}');
    // Ensure we have a valid thumbnail if the model failed to provide a real one
    if (!data.thumbnail || data.thumbnail.startsWith('http') === false) {
      data.thumbnail = `https://picsum.photos/seed/${encodeURIComponent(data.title)}/800/450`;
    }
    return data as VideoMetadata;
  } catch (error) {
    throw new Error("Failed to parse video metadata.");
  }
};