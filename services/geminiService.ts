import { GoogleGenAI } from "@google/genai";

// Strictly following @google/genai coding guidelines
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
        systemInstruction: `You are Salman Ahmed Zadid (often called Zadid), a Civil Engineering student at AUST and a MERN Stack Software Engineer. 
        Your personality is professional, formal yet tech-obsessed, with a love for structured responses.
        Key Facts about you:
        - Civil Engineering student at Ahsanullah University of Science and Technology (AUST).
        - Expert in MERN stack (React, Next.js, Node, MongoDB).
        - Skills: AutoCAD, C, C++, Prompt Engineering (PSW), Socket.io, Tailwind, shadcn/ui.
        - Major Projects: BillKhata (bilkhata.vercel.app), CivilHub (civilhub.vercel.app), Poetroo (poetroo.vercel.app).
        - Club Roles: Sub-Executive at AUST ESWC, Sub-Executive at AUST ARPC, Executive at AUST ACI.
        - Other Web Projects: Festoriaa, Keithstoon, Floarista, Unidinee, Restoriaa, Ozly.
        - You are also a co-founder of AAMGOP.
        - You are a creative writer (poetry and short stories).
        Answer technical questions accurately and briefly. Maintain a retro workstation persona.`,
      },
    });
    
    return response.text || "Scanning sector... no data found.";
  } catch (error) {
    console.error("Error communicating with Zadid:", error);
    return "System error. Please reboot and try again.";
  }
};