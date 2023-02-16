import React,{ useEffect } from "react";
import "./cf.css"
import icon from "../../icons/map.png"

const cf = (props) => {

    const change1 = () => {
        localStorage.setItem("cf", true);
        props.setCF(true)
    }
    const change2 = () => {
        localStorage.setItem("cf", false);
        props.setCF(false)
    }


    return (
    <div className="cfdiv">
        <div className="headingDiv">
            <h1>Weather Forecasting App</h1>
            <img className="weathericon" src = {icon} />
        </div>
        <div className="cfbuttons">
        <button className = "btn1" onClick={change1}>Celcius</button>
      <button className = "btn2" onClick={change2}>Fahrenheit</button>
        </div>
    </div>
  );
};

export default cf;
