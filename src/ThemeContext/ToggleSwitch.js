import React, { useContext } from "react";
import "./ToggleSwitch.css";
import ThemeContext from "./ThemeContext";

const ToggleSwitch = () => {
  const { toggleMode } = useContext(ThemeContext);

  return (
    <div className="ToggleSwitch-div">
      <label className="switch">
        <input onClick={toggleMode} type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
