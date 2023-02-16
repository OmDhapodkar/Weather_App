import React from "react";
import "./history.css";

const HistoryWeather = ({ data,cf }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.location.name}</p>
          <p className="weather-description">{data.current.condition.text}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`${data.current.condition.icon}`}
        />
      </div>
      <div className="bottom">
        {cf && <p className="temperature">{data.current.temp_c}°C</p>}
        {!cf && <p className="temperature">{data.current.temp_f}°F</p>}
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            {cf && <span className="parameter-value">{data.current.feelslike_c}°C</span>}
            {!cf && <span className="parameter-value">{data.current.feelslike_f}°F</span>}
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.current.wind_kph} kph</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.current.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.current.pressure_mb} hPa</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Visibility</span>
            <span className="parameter-value">{data.current.vis_km} Km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryWeather;
