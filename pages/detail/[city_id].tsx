import CityData from "@/interfaces/city";
import WeatherData from "@/interfaces/weather";
import cities from "@/lib/city.list.json";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
let Cities = cities as CityData[];
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { city_id } = context.query;
  // Find the city why city Id
  const city = Cities.find((city) => city.id.toString() == city_id);
  if (!city) {
    throw new Error("City not found");
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.WEATHER_API_KEY}
&exclude=minutely&units=metric`;
  // Fetch the weather data
  const res = await fetch(url);
  const weatherData: WeatherData = await res.json();
  if (!weatherData) {
    throw new Error("Weather data not found");
  }
  return {
    props: {
      city: city,
      weather: weatherData,
    },
  };
}
type Props = {
  city: CityData;
  weather: WeatherData;
};

export default function ({ city, weather }: Props) {
  return (
    <>
      <Head>
        <title>WeatherView</title>
      </Head>
      <main>
        <div className="container">
          <Link href="/">&larr; Home</Link>
          <h1>
            {city.name} ({city.country})
          </h1>
          <h2>
            {weather.main.temp_max.toFixed(0)}&deg;C
            {weather.main.temp_min.toFixed(0)}&deg;C
          </h2>
          <div>{weather.weather[0].description}</div>
        </div>
      </main>
    </>
  );
}
