import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Carousel = ({ data2 }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  var data = data2.data.list;
  var newData = [];

  for (var i = 0; i < 7; i++) {
    newData.push(0);
  }
  for (var i = 0; i < 7; i++) {
    newData[i] = data[i + 1];
  }

  data = newData;

  const items = data.splice(0, 7)?.map((item, idx) => (
    <div className="carouselItem">
      <div className="carouselweather">
        <div className="top">
          <div>
            <p className="carouselcity">{forecastDays[idx]}</p>
            <p className="carouselweather-description">
              {item.weather[0].description}
            </p>
          </div>
          <img
            alt="weather"
            className="carouselweather-icon"
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          />
        </div>
        <div className="bottom">
          {data2.cf && (
            <p className="carouseltemperature">{item.main.temp_max}°C</p>
          )}
          {!data2.cf && (
            <p className="carouseltemperature">
              {parseFloat((item.main.temp_max * (9 / 5) + 32).toFixed(2))}°F
            </p>
          )}
          <div className="carouseldetails">
            <div className="carouselparameter-row">
              <span className="carouselparameter-label">Feels like</span>
              {data2.cf && (
                <span className="carouselparameter-value">
                  {item.main.feels_like}°C
                </span>
              )}
              {!data2.cf && (
                <span className="carouselparameter-value">
                  {parseFloat((item.main.feels_like * (9 / 5) + 32).toFixed(2))}
                  °F
                </span>
              )}
            </div>
            <div className="carouselparameter-row">
              <span className="carouselparameter-label">Humidity</span>
              <span className="carouselparameter-value">
                {item.main.humidity}%
              </span>
            </div>
            <div className="carouselparameter-row">
              <span className="carouselparameter-label">Visibility</span>
              <span className="carouselparameter-value">
                {parseFloat((item.visibility / 1000).toFixed(2))} Km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      item: 2,
    },
    1024: {
      items: 3,
    },
  };

  return (
    <AliceCarousel
      autoPlay
      autoPlayInterval={3000}
      responsive={responsive}
      infinite
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
