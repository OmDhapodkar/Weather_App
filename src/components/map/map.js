import React,{useState} from "react";
import "./map.css";

const Map = (props) => {
    return (
    <div className="map">
        <button className="btn1" onClick={()=>{props.handleOnLocationChange()}}>Use Your Current Locaiton</button>
    </div>
  );
};

export default Map;
