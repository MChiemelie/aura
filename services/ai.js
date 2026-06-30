"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const fallbackSuggestions = [
  {
    tags: ["clear", "sunny"],
    text: "Great day for a walk, picnic, or outdoor sports. Try a light salad or cold drink!",
  },
  {
    tags: ["clouds", "overcast", "cloudy"],
    text: "Perfect weather for a hike or bike ride. A warm sandwich or soup would hit the spot.",
  },
  {
    tags: ["rain", "drizzle", "thunderstorm", "shower"],
    text: "Stay in with a good book or movie. Hot chocolate or a comforting bowl of noodles recommended!",
  },
  {
    tags: ["snow", "sleet", "blizzard"],
    text: "Build a snowman or enjoy indoor board games. A hearty stew or hot tea keeps you warm.",
  },
  {
    tags: ["fog", "mist", "haze"],
    text: "Low visibility — take it easy indoors. Try baking cookies or cooking a warm breakfast.",
  },
  {
    tags: ["wind", "breeze", "gust"],
    text: "Fly a kite if it's safe, or stay cozy indoors. A warm bowl of oatmeal or coffee is perfect.",
  },
];

function getFallback(weather) {
  const desc = (weather.desc || "").toLowerCase();
  for (const item of fallbackSuggestions) {
    if (item.tags.some((tag) => desc.includes(tag))) {
      return item.text;
    }
  }
  return `The weather in ${weather.city} is ${weather.temp}°C, ${weather.desc}. A great day to explore the outdoors or relax at home!`;
}

export async function getSuggestions(weather) {
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: `The weather in ${weather.city} is ${weather.temp}°C, ${weather.desc}. What activities or meals do you recommend? Keep it under 200 characters.`,
    });

    return { suggestion: text };
  } catch {
    return { suggestion: getFallback(weather), fallback: true };
  }
}
