import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The server is missing OPENAI_API_KEY. Add it to .env.local and restart the dev server." },
      { status: 503 }
    );
  }

  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }

    const { channelName, channelFocus, channelAudience, prompt } = body as {
      channelName?: string;
      channelFocus?: string;
      channelAudience?: string;
      prompt?: string;
    };

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Enter a task for Jarvis first." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });
    const systemPrompt = `You are Jarvis, a practical AI assistant for a YouTube creator. Help brainstorm video ideas, produce titles, hooks, scripts, channel strategy, and content calendars. The creator's channel is ${channelName || "a YouTube channel"}. Focus: ${channelFocus || "general content creation"}. Audience: ${channelAudience || "general viewers"}. Do not claim access to live channel analytics unless the user provides the data.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt.trim() },
      ],
    });

    return NextResponse.json({ output: completion.choices[0]?.message?.content ?? "No response generated." });
  } catch (error) {
    console.error("Jarvis chat request failed:", error);
    return NextResponse.json(
      { error: "Jarvis could not generate a reply. Check that your API key is valid and has available API credit, then try again." },
      { status: 500 }
    );
  }
}
