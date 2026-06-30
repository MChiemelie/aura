"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { getSuggestions } from "@/services/ai";
import { getWeather } from "@/services/weather";
export default function WeatherApp() {
  const [weather, fetchWeather, loading] = useActionState(
    (_, formData) => getWeather(formData),
    null,
  );
  const [suggestion, setSuggestion] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [asking, setAsking] = useState(false);

  async function askAI() {
    setAsking(true);
    const result = await getSuggestions(weather);
    setSuggestion(result.suggestion);
    setIsFallback(result.fallback || false);
    setAsking(false);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <form action={fetchWeather} className="flex gap-2">
        <input
          name="city"
          placeholder="Enter a city"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {weather && (
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {weather.city}, {weather.country}
          </h2>
          <Image
            src={weather.icon}
            alt={weather.desc}
            width={100}
            height={100}
            className="mx-auto"
          />
          <p className="capitalize">{weather.desc}</p>
          <p className="text-2xl">{weather.temp}°C</p>

          {!suggestion && !asking && (
            <button
              type="button"
              onClick={askAI}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Get AI Suggestions
            </button>
          )}

          {asking && <p className="mt-4 text-gray-500">Thinking...</p>}

          {suggestion && (
            <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 mt-4 max-w-md">
              <p>{suggestion}</p>
              {isFallback && (
                <p className="text-xs text-gray-400 mt-2">
                  (AI unavailable — showing offline suggestion)
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
