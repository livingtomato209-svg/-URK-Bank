import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WebsitePlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const websitePlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: "A catchy name for the website project." },
    targetAudience: { type: Type.STRING, description: "Who the website is for." },
    designVibe: { type: Type.STRING, description: "Adjectives describing the look and feel (e.g., Minimalist, Corporate, Playful)." },
    colorPalette: {
      type: Type.OBJECT,
      properties: {
        primary: { type: Type.STRING, description: "Main brand color (Hex code)." },
        secondary: { type: Type.STRING, description: "Secondary color (Hex code)." },
        accent: { type: Type.STRING, description: "Accent color for buttons/highlights (Hex code)." },
        background: { type: Type.STRING, description: "Main background color (Hex code)." },
      },
      required: ["primary", "secondary", "accent", "background"],
    },
    pages: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Title of the page (e.g., Home, About)." },
          route: { type: Type.STRING, description: "URL route (e.g., /home)." },
          summary: { type: Type.STRING, description: "Brief description of the page content." },
          keyFeatures: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 2-3 key UI elements or features on this page.",
          },
        },
        required: ["title", "route", "summary", "keyFeatures"],
      },
    },
  },
  required: ["projectName", "targetAudience", "designVibe", "colorPalette", "pages"],
};

export const generateWebsitePlan = async (userDescription: string): Promise<WebsitePlan> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a detailed website architecture plan for the following request: "${userDescription}". 
      Think like a senior product manager and UI/UX designer. 
      Ensure color codes are valid hex strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: websitePlanSchema,
        systemInstruction: "You are an expert web architect. Your goal is to take vague user requests and turn them into concrete, professional website project plans.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as WebsitePlan;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const refineConsultation = async (history: string[], newMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Previous conversation:\n${history.join('\n')}\n\nUser: ${newMessage}\n\nProvide a helpful, guiding response asking clarifying questions to help build a website plan. Keep it short (under 50 words).`,
    });
    return response.text || "I'm having trouble thinking right now. Could you elaborate?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I lost connection to the server.";
  }
};