import { useEffect, useState } from "react";
import weatherApi from "../services/weather";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    weatherApi.getWeather(country.capital)
      .then(data => {
        setWeather(data);

        const icon = data.weather[0].icon;
        setImgUrl(`https://openweathermap.org/img/wn/${icon}@2x.png`);
      })
      .catch(error => {
        console.error("Failed to fetch weather data:", error);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <div>
          <img src={imgUrl} alt="weather icon" />
          <p>Temperature {weather.main.temp} celsius</p>
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Could not fetch weather data</p>
      )}
    </div>
  );
};

export default CountryDetails;