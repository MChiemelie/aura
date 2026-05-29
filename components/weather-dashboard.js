"use client";

import { useState, useCallback } from "react";
import WeatherForm from "@/components/weather-form";
// import AIResponse from "@/components/ai-response";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [queryCount, setQueryCount] = useState(0);

  const handleWeatherData = useCallback((data) => {
    setWeatherData(data);
    setQueryCount((c) => c + 1);
  }, []);

  return (
    <div>
      <WeatherForm onWeatherData={handleWeatherData} />
      {/* <AIResponse key={queryCount} weatherData={weatherData} /> */}
    </div>
  );
}
