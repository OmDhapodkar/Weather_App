import React from "react";

import "./forecast.css";
import Carousel from "../Carousel/Carousel.js";

const Forecast = (props) => {
  return (
    <>
      <label className="title">Forecast</label>
      <Carousel data2={props} />
    </>
  );
};

export default Forecast;
