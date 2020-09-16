import React from "react";
import "./Select.css";

export const SelectComponent = ({currencies, change, id}) => {
  return (
    <>
      <select className="dropdown" onChange={change(id)}>
        {currencies.map((currency) => <option value={currency.unit}>{currency.label}</option>)}
      </select>
    </>

  )
}