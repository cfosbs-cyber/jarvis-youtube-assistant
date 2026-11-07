import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { channelName, channelFocus, channelAudience, prompt } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are Jarvis, a high-performance AI assistant for a YouTube creator. 
You help brainstorm viral ideas, produce titles, hooks, scripts, channel strategy, and content calendars.
The creator's channel is ${channelName || "a YouTube channel"}. 
Focus: ${channelFocus || "general content creation"}. 
Audience: ${channelAudience || "general viewers"}. 
Your answers should be practical, strategic, and highly creator-focused.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt || "Help me plan a YouTube growth strategy." },
      ],
    });

    const output = completion.choices[0]?.message?.content ?? "No response generated.";

    return NextResponse.json({ output });
  } catch (error) {
    console.error("OpenAI request failed", error);
    return NextResponse.json(
      { error: "Failed to generate AI output. Please check your API key and request." },
      { status: 500 }
    );
  }
}
