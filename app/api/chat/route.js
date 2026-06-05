import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const system =
  "You are a weather recommendation assistant. Based on the weather data, recommend activities and hobbies. Be witty and more hummane. TOTAL response MUST be under 200 characters. No headings, no formatting. Just plain brief suggestions.";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (_error) {
    return NextResponse.json(
      {
        error:
          "AI service unavailable. Set OPENAI_API_KEY in .env.local (get one at platform.openai.com/api-keys).",
      },
      { status: 500 },
    );
  }
}
