"use client";

import Image from "next/image";
import { useActionState, useEffect } from "react";
import { getWeather } from "@/services/weather";

export default function WeatherForm({ onWeatherData }) {
  const [state, action, pending] = useActionState(
    async (_prevState, formData) => {
      const result = await getWeather(formData);
      return result;
    },
    null,
  );

  useEffect(() => {
    if (state) onWeatherData?.(state);
  }, [state, onWeatherData]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <form
        action={action}
        className='flex gap-4 p-2 rounded text-sm mx-auto flex-col items-center'
      >
        <input
          type='text'
          name='city'
          id='city'
          className='border p-2 rounded'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
          disabled={pending}
        >
          {pending ? "Loading..." : "Get Weather"}
        </button>
      </form>

      {state && (
        <div className='w-full max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold mb-4'>
            {state.name}, {state.country}
          </h2>
          <p className='text-lg mb-2'>{state.description}</p>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <p>Temperature: {state.temp}°C</p>
            <p>Feels like: {state.feels_like}°C</p>
            <p>Min temp: {state.temp_min}°C</p>
            <p>Max temp: {state.temp_max}°C</p>
            <p>Pressure: {state.pressure} hPa</p>
            <p>Humidity: {state.humidity}%</p>
            <p>Sea level: {state.sea_level} hPa</p>
            <p>Ground level: {state.grnd_level} hPa</p>
            <p>Wind speed: {state.speed} m/s</p>
            <p>Wind direction: {state.deg}°</p>
            <p>Cloudiness: {state.all}%</p>
            <p>Visibility: N/A</p>
            <p>Latitude: {state.lat}</p>
            <p>Longitude: {state.lon}</p>
            <p>Timezone: {state.timezone}</p>
            <p>Weather ID: {state.weatherId}</p>
            <Image
              src={state.iconImage || null}
              alt='Weather icon'
              width={100}
              height={100}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
