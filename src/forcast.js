import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setError("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather({});
        setError({ message: "Not Found", query: city });
      });
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={weather.weather ? weather.weather[0].icon : "01d"}
          color="white"
          size={112}
          animate={true}
        />
      </div>
      <div className="today-weather">
        <h3>{weather.weather ? weather.weather[0].main : ""}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
            />
          </div>
        </div>
        <ul>
          {weather.main ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c (
                  {weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
