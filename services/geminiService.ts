import { GoogleGenAI } from "@google/genai";

// Strictly following @google/genai coding guidelines
// Initializing with the process.env directly to ensure the SDK uses the injected key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMacResponse = async (userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I seem to have lost my connection to the matrix (API Key missing).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are Mac, a retro-styled digital designer from the 90s/early 2000s living inside a portfolio website. 
        Your personality is helpful, slightly quirky, and obsessed with brutalist, retro, and monochrome design. 
        Keep your answers concise, witty, and related to web design, coding, or the portfolio content.
        You strictly avoid modern corporate speak. You like 'pixels', 'borders', and 'clean code'.`,
      },
    });
    
    return response.text || "Scanning sector... no data found.";
  } catch (error) {
    console.error("Error communicating with Mac:", error);
    return "System error. Please reboot and try again.";
  }
};