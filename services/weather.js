"use server";

export async function getWeather(formData) {
  const city = formData.get("city");
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OPENWEATHERMAPAPI}&units=metric`,
  );
  const data = await res.json();

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    desc: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}
