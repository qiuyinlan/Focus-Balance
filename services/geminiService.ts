
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMotivationalQuote = async (timeFocused: number, totalGold: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User has focused for ${timeFocused} seconds and earned ${totalGold} gold. Give a short, encouraging one-sentence motivational quote about focus, patience, or the value of time. Keep it light and friendly. Answer in Chinese if possible, as the user requested in Chinese.`,
    });
    return response.text || "每一秒的坚持都在灌溉你的财富之树。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "保持专注，金币就在前方！";
  }
};
