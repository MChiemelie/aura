"use client";

import { useChat } from "@ai-sdk/react";

export default function AIResponse({ weatherData }) {
  const { messages, sendMessage, isLoading } = useChat();

  function askAI() {
    if (!weatherData) return;
    sendMessage({
      text: `The weather in ${weatherData.name}, ${weatherData.country}: ${weatherData.description}, ${weatherData.temp}°C, feels like ${weatherData.feels_like}°C, humidity ${weatherData.humidity}%, wind ${weatherData.speed} m/s. What hobbies, meals, or activities do you recommend?`,
    });
  }

  const recs = messages.filter((m) => m.role === "assistant");

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
      {weatherData && recs.length === 0 && !isLoading && (
        <button type="button" onClick={askAI}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mx-auto block text-sm"
        >
          Get AI Suggestions
        </button>
      )}
      {recs.map((msg) =>
        msg.parts
          .filter((p) => p.type === "text")
          .map((p, i) => (
            <div
              key={`${msg.id}-${i}`}
              className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 whitespace-pre-wrap"
            >
              {p.text}
            </div>
          )),
      )}
      {isLoading && <p className="text-gray-500 text-center">Loading recommendations...</p>}
    </div>
  );
}
