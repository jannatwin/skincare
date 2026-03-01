import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GOOGLE_GEMINI_API_KEY is missing. AI features will be disabled.");
}

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getGeminiModel = (modelName: string = "gemini-1.5-flash") => {
    if (!genAI) return null;
    return genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
            responseMimeType: "application/json",
        }
    });
};
