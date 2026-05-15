import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({ 
        reply: "I'm currently in offline mode (API key missing), but I can tell you that staying consistent with your daily streak is the best way to build long-term habits!" 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are VIBE, a premium AI Productivity Coach. 
    You are helping a user with their daily tasks and life management.
    Be encouraging, concise, and professional. 
    User says: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
