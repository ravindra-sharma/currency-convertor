import React from "react";
import "./Select.css";

export const InputComponent = ({change, value}) => {
  
  return (
    <div className="inputWrapper">
      <input type="number" value={value} onChange={change}></input>
    </div>

  )
}