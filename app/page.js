import WeatherApp from "@/components/weather-app";

export default async function Home() {
  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Weather AI</h1>
      <WeatherApp />
    </main>
  );
}
