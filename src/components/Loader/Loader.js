import React from "react";
import "./Loader.css";
import { github, dribbble, instagram, about, linkedin } from "../../assets";

function Loader() {
  return (
    <div className="loader">
      <div className="about">
        <a
          className="bg_links social github"
          href="https://github.com/OmDhapodkar"
          target="_blank"
        >
          <span className="icon">
            <img src={github} alt="github" />
          </span>
        </a>
        <a
          className="bg_links social dribbble"
          href="https://dribbble.com/OmDhapodkar"
          target="_blank"
        >
          <span className="icon">
            <img src={dribbble} alt="dribbble" />
          </span>
        </a>
        <a
          className="bg_links social linkedin"
          href="https://www.linkedin.com/in/om-dhapodkar-485826205/"
          target="_blank"
        >
          <span className="icon">
            <img src={linkedin} alt="linkedin" />
          </span>
        </a>
        <a className="bg_links logo">
          <span className="icon">
            <img src={about} alt="about" />
          </span>
        </a>
      </div>

      <div className="content">
        <div className="planet">
          <div className="ring"></div>
          <div className="cover-ring"></div>
          <div className="spots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
