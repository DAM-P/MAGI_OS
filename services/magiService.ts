import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MagiResponse, Vote, Language } from "../types";

const SYSTEM_INSTRUCTION = `
You are the MAGI Supercomputer System from Neon Genesis Evangelion.
You are composed of three distinct artificial intelligence personalities that must vote on user queries.

1. MELCHIOR-1 (Scientist): Logic, scientific fact, technological progress, cold rationality.
2. BALTHASAR-2 (Mother): Protective, maintaining status quo, prioritizing human safety and stability.
3. CASPER-3 (Woman/Individual): Intuitive, pragmatic, sometimes selfish or aggressive, realistic about human nature.

Analyze the user's input. Each node must provide a vote (APPROVE, DENY, or CONDITIONAL) and a short, punchy reasoning (max 20 words) based strictly on their specific personality archetype.
Finally, determine the consensus based on the majority vote.
`;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    results: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          nodeName: { type: Type.STRING, enum: ['MELCHIOR-1', 'BALTHASAR-2', 'CASPER-3'] },
          description: { type: Type.STRING },
          vote: { type: Type.STRING, enum: ['APPROVE', 'DENY', 'CONDITIONAL'] },
          reasoning: { type: Type.STRING },
        },
        required: ['nodeName', 'description', 'vote', 'reasoning'],
      },
    },
    consensus: { type: Type.STRING },
  },
  required: ['results', 'consensus'],
};

export const consultMagi = async (query: string, language: Language = 'EN'): Promise<MagiResponse> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    
    let instruction = SYSTEM_INSTRUCTION;
    if (language === 'CN') {
      instruction += `\nIMPORTANT: The user interacts in Chinese. You must provide the 'reasoning' and 'consensus' fields in Simplified Chinese (Zh-CN). However, keep the 'vote' (APPROVE/DENY/CONDITIONAL) and 'nodeName' fields in English as strictly defined by the schema.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: instruction,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.7, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from MAGI");

    return JSON.parse(text) as MagiResponse;

  } catch (error) {
    console.error("MAGI System Error:", error);
    throw error;
  }
};