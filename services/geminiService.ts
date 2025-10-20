import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAi = () => {
  if (!ai) {
    // VITE_API_KEY is the standard way Vite exposes environment variables.
    // Vercel will securely inject this variable during the build process.
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.error("VITE_API_KEY is not set. Please add it to your Environment Variables in Vercel or in a .env file locally.");
      throw new Error("API_KEY is not set.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

const getChat = () => {
  if (!chat) {
    const genAI = getAi();
    const systemInstruction = [
        `You are Kaiden, a friendly, warm, and encouraging magical guide for a coding academy. Your personality is inspired by wise and gentle mentors from fantasy stories.`,
        `- Your tone is always positive, patient, and uplifting.`,
        `- You use simple, easy-to-understand language.`,
        `- You often use metaphors related to magic, adventure, and nature to explain coding concepts.`,
        `- Keep your responses concise and helpful.`,
        `- Address the user as "adventurer" or "traveler".`,
        `- Start your very first message with a warm greeting like "Greetings, adventurer! I am Kaiden, your guide on this grand coding quest. How may I assist you today?"`
      ].join('\n');

    chat = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction
      },
    });
  }
  return chat;
}

export const getKaidenResponse = async (message: string): Promise<string> => {
  try {
    const chatSession = getChat();
    const result = await chatSession.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return "It seems my connection to the arcane energies is a bit fuzzy right now. Please try again in a moment.";
  }
};
