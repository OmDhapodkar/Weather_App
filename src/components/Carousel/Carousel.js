import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect, useState } from "react";
import axios from "axios";
import "./Carousel.css"

const handleDragStart = (e) => e.preventDefault();

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



const Carousel = ({data2}) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    var data = data2.data
    var newData = [];

    for(var i = 0; i < 7; i++) {
      newData.push(0)
    }
    for(var i = 0; i < 7; i++) {
      newData[i] = data[i]
    }
  
    data = newData

    const items = data.splice(0, 7)?.map((item,idx)=>(
        <div className='carouselItem'>
            <div className="carouselweather">
                <div className="top">
                    <div>
                    <p className="carouselcity">{forecastDays[idx]}</p>
                    <p className="carouselweather-description">{item.day.condition.text}</p>
                    </div>
                    <img
                    alt="weather"
                    className="carouselweather-icon"
                    src={`${item.day.condition.icon}`}
                    />
                </div>
                <div className="bottom">
                    {data2.cf && <p className="carouseltemperature">{item.day.maxtemp_c}°C {item.day.mintemp_c}°C</p>}
                    {!data2.cf && <p className="carouseltemperature">{item.day.maxtemp_f}°F {item.day.mintemp_f}°F</p>}
                    <div className="carouseldetails">
                        <div className="carouselparameter-row">
                            <span className="carouselparameter-label">Feels like</span>
                            {data2.cf && <span className="carouselparameter-value">{item.day.avgtemp_c}°C</span>}
                            {!data2.cf && <span className="carouselparameter-value">{item.day.avgtemp_f}°F</span>}
                        </div>
                        <div className="carouselparameter-row">
                            <span className="carouselparameter-label">Humidity</span>
                            <span className="carouselparameter-value">{item.day.avghumidity}%</span>
                        </div>
                        <div className="carouselparameter-row">
                            <span className="carouselparameter-label">Visibility</span>
                            <span className="carouselparameter-value">{item.day.avgvis_km} Km</span>
                        </div>
                        <div className="carouselparameter-row">
                            <span className="carouselparameter-label">Sunrise</span>
                            <span className="carouselparameter-value">{item.astro.sunrise}</span>
                        </div>
                        <div className="carouselparameter-row">
                            <span className="carouselparameter-label">Sunset</span>
                            <span className="carouselparameter-value">{item.astro.sunset}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
  
    
    const responsive =  {
        0: {
            items: 1,
        },
        512 : {
            item : 2,
        },
        1024: {
            items: 3,
        }
      }
    
    return (
    <AliceCarousel 
        autoPlay 
        autoPlayInterval = {3000}
        responsive={responsive} 
        infinite
        mouseTracking items={items} />
  );
}

export default Carousel;