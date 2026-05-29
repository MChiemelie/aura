"use server";

export async function getWeather(formData) {
	try {
		const city = formData.get("city");
		const apiKey = process.env.OPENWEATHERMAPAPI;
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`,
		);
		const data = await response.json();
		const {
			coord,
			weather,
			base,
			main,
			visibility,
			wind,
			clouds,
			dt,
			sys,
			timezone,
			id,
			name,
			cod,
		} = data;
		const { lon, lat } = coord;
		const {
			temp,
			feels_like,
			temp_min,
			temp_max,
			pressure,
			humidity,
			sea_level,
			grnd_level,
		} = main;
		const { speed, deg } = wind;
		const { all } = clouds;
		const { type, id: sysId, country, sunrise, sunset } = sys;
		const { id: weatherId, main: weatherMain, description, icon } = weather[0];
		const iconImage = `https://openweathermap.org/img/wn/${icon}@2x.png`;
		return {
			weatherId,
			main: weatherMain,
			description,
			icon,
			iconImage,
			lon,
			lat,
			temp,
			feels_like,
			temp_min,
			temp_max,
			pressure,
			humidity,
			sea_level,
			grnd_level,
			speed,
			deg,
			all,
			dt,
			timezone,
			id,
			name,
			cod,
			type,
			sysId,
			country,
			sunrise,
			sunset,
		};
	} catch (error) {
		return error;
	}
}
