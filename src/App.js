import './App.css';
import WeatherToday from './WeatherToday.js';
import { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityInput, setCityInput] = useState("Graz")
  const [city, setCity] = useState("Graz")
  const [lat, setLat] = useState(47.07)
  const [long, setLong] = useState(15.43)


  function fetchGeoData(){
    
  }

  function fetchWeatherStatus(){
    
  }

  useEffect(() => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=210977eea4964620bffc3475a39b45ed`)
    .then(response => response.json())
    .then((usefulData) => {
      console.log("Geo Data Fetched")
      setLat(usefulData.results[0].geometry.lat.toFixed(2))
      setLong(usefulData.results[0].geometry.lng.toFixed(2))
    })
    .catch((e) => {
      console.error(`Error: ${e}`)
    })
  }, [city])

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,rain`)
    .then(response => response.json())
    .then((usefulData) => {
      console.log(`Weather Data Fetched - ${city}`)
      setData(usefulData)
      setLoading(false)
    })
    .catch((e) => {
      console.error(`Error: ${e}`)
    })
  }, [long])

  function handleChangeInput(event){
    setCityInput(event.target.value)
  }
  function handleKeyDownInput(event){
    if (event.key === 'Enter'){
      setCity(cityInput)
    }
  }    

  return (
    <div className="App">
      <p>Choose City or Region</p>
      <input type='text' value={cityInput} onChange={handleChangeInput} onKeyDown={handleKeyDownInput}></input>
      <div className='WeatherToday'>
        <h1>Today's temperature in {city}</h1>
        {loading && <p>Loading...</p>}
        {!loading && <WeatherToday data={data} />}  
      </div>
    </div>
  );
}

export default App;
