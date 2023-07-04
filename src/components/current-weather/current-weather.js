import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data, cf }) => {
  // console.log(data);
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.name}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt={`${data.weather[0].icon}`}
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        />
      </div>
      <div className="bottom">
        {cf && <p className="temperature">{data.main.temp}°C</p>}
        {!cf && (
          <p className="temperature">
            {parseFloat((data.main.temp * (9 / 5) + 32).toFixed(2))}°F
          </p>
        )}
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            {cf && (
              <span className="parameter-value">{data.main.feels_like}°C</span>
            )}
            {!cf && (
              <span className="parameter-value">
                {parseFloat((data.main.feels_like * (9 / 5) + 32).toFixed(2))}°F
              </span>
            )}
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} mps</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Visibility</span>
            <span className="parameter-value">
              {parseFloat((data.visibility / 1000).toFixed(2))} Km
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
