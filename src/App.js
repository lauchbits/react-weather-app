import './App.css';
import WeatherToday from './WeatherToday.js';
import ThreeDays from './ThreeDays.js';
import { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityInput, setCityInput] = useState("Graz")
  const [city, setCity] = useState("Graz")
  const [lat, setLat] = useState(47.07)
  const [long, setLong] = useState(15.43)
  const [currentTemp, setCurrentTemp] = useState("")
  const [threeDayClicked, setThreeDayClicked] = useState(false)


  function fetchGeoData(){
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=210977eea4964620bffc3475a39b45ed`)
    .then(response => response.json())
    .then((usefulData) => {
      console.log("Geo Data Fetched")
      setLat(usefulData.results[0].geometry.lat.toFixed(2))
      setLong(usefulData.results[0].geometry.lng.toFixed(2))
    })
    .catch((e) => {
      console.error(`Geo Data Error: ${e}`)
    })
  }

  function fetchWeatherStatus(){
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,rain`)
    .then(response => response.json())
    .then((usefulData) => {
      console.log(`Weather Data Fetched - ${city}`)
      setData(usefulData)

      let currentHour = new Date().getHours()
      setCurrentTemp(data.hourly.temperature_2m[currentHour])

      setLoading(false)
    })
    .catch((e) => {
      console.error(`Weather Fetching Error: ${e}`)
    })
  }

  useEffect(() => {
    fetchGeoData()
  }, [city])

  useEffect(() => {
    fetchWeatherStatus()
  }, [long])

  function handleChangeInput(event){
    setCityInput(event.target.value)
  }
  function handleKeyDownInput(event){
    if (event.key === 'Enter'){
      console.log(cityInput)
      setCity(cityInput)
    }
  }
  function handleThreeDayClicked(event){
    setThreeDayClicked(!threeDayClicked)
  }

  return (
    <div className="App">
      <input className='cityInput' type='text' value={cityInput} onChange={handleChangeInput} onKeyDown={handleKeyDownInput}></input>

      <div className='TempNow'>
        {loading && <p>Loading...</p>}
        {!loading && currentTemp}°C
        
      </div>

      <div className='ThreeDays' onClick={handleThreeDayClicked}>
        <p className='header'>3 Tage-Vorhersage</p>
        {loading && <p>Loading...</p>}
        {!loading && <ThreeDays data={data} clicked={threeDayClicked}/>}
      </div>
      

      <div className='WeatherToday'>
        <p className='header'>24 Stunden-Vorhersage</p>
        {loading && <p>Loading...</p>}
        {!loading && <WeatherToday data={data} />}  
      </div>
    </div>
  );
}

export default App;