
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelItinerary = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are an expert travel consultant for "RBS Tour and Travels", an Indian travel company. 
      Your goal is to provide detailed, exciting, and culturally rich travel itineraries for Indian destinations.
      Be friendly, informative, and always suggest localized experiences (food, hidden gems).
      Return the output as a structured JSON object.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          duration: { type: Type.STRING },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                activity: { type: Type.STRING },
                location: { type: Type.STRING },
              },
              required: ["day", "activity", "location"],
            },
          },
          estimatedCost: { type: Type.STRING },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["destination", "duration", "itinerary", "estimatedCost", "tips"],
      },
    },
  });

  return JSON.parse(response.text || '{}');
};

export const chatWithAssistant = async (message: string, history: { role: string; content: string }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the virtual assistant for RBS Tour and Travels. 
      RBS Tour and Travels is based in India and offers tour packages, taxi services, and hotel bookings across all Indian states.
      Help users with their travel queries, suggest packages, and inform them about Indian destinations. 
      Keep your tone helpful, professional, and hospitable (Atithi Devo Bhava).`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
