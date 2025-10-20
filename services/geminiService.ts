import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;
let isInitialized = false;

const getAi = (): GoogleGenAI | null => {
  if (ai) return ai;

  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    console.warn("VITE_API_KEY is not set. Kaiden Assistant will be disabled.");
    return null;
  }
  
  try {
    ai = new GoogleGenAI({ apiKey });
    return ai;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    return null;
  }
}

const getChat = (): Chat | null => {
  if (chat) return chat;
  
  const genAI = getAi();
  if (!genAI) {
    return null; // Return early if AI initialization failed
  }

  if (!isInitialized) {
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
      isInitialized = true;
  }
  return chat;
}

export const getKaidenResponse = async (message: string): Promise<string> => {
  const chatSession = getChat();
  if (!chatSession) {
    return "My connection to the arcane energies is severed. Please ensure the sacred API key is correctly configured in the Vercel environment variables.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return "It seems my connection to the arcane energies is a bit fuzzy right now. Please try again in a moment.";
  }
};