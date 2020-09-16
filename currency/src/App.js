import React, { useState, useEffect } from 'react';
import './App.css';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';

function App() {
  const [currencies, setCurrencies] = useState([]);

  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("inr");
  const [value, setValue] = useState(0);
  const [res, setRes] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/currencies");
      res
        .json()
        .then(res => setCurrencies(res))
        .catch(err => console.log(err));
    }

    fetchData();
  },[]);

  const change = (event)=>{
    setValue(event.target.value);
    const inputData = parseFloat(event.target.value);
    const fromVal = currencies.find(elm => elm.unit === from).value;
    const toVal = currencies.find(elm => elm.unit === to).value;
    setRes((inputData * toVal / fromVal).toFixed(2));
  }

  const selectChange = (id) => {
    const inputData = parseFloat(value);
    const fromVal = currencies.find(elm => elm.unit === from)?.value;
    const toVal = currencies.find(elm => elm.unit === to)?.value;
    setRes((inputData * toVal / fromVal).toFixed(2));
    return (event)=>{
      if(id==="from"){
        setFrom(event.target.value);
      } else{
        setTo(event.target.value);
      } 
    }
  }

  return (
    <div className="App">
      <h1>Currency Convertor</h1>
      <SelectComponent currencies={currencies} change={selectChange} id="from"></SelectComponent>
      <span style={{
        fontSize:"xx-large",
        marginRight: "10px",
        marginLeft: "10px"
      }}>&rarr;</span>
      <SelectComponent currencies={currencies} change={selectChange} id="to"></SelectComponent>
      <InputComponent value={value} change={change}></InputComponent>
      <div style={
        {
          marginTop: "36px",
          fontSize: "56px"
        }
      }>
        {res} {" "+currencies.find(elm => elm.unit === to)?.label}
      </div>
    </div>
  );
}

export default App;
