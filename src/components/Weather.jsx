import React, { useEffect, useState, useMemo, useCallback } from 'react'
import './Weather.css'
import { getCity }  from '../utils/geo'


//////////////////////////////////////////
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
////////////////////////////////////////
export const Weather = () => {

  const [weatherData, setWeatherData] = useState(false)
  const [input, setInput] = useState("")

  const allIcon = {
    "01d": cloud_icon,
    "01n": cloud_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

 
 ///////////////////////////func to get weather data of a giving city
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcon[data.weather[0].icon] || clear_icon
     setWeatherData(
        {
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon
        }
      )


      //////////////////////
    } catch(err) {
      console.log("failed to connect")

    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////// first effect for user location 
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
  async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const city = await  getCity(latitude, longitude);
    search(city)
  },
  (error) => {
    console.error("Error getting location:", error);
    /// using lagos as defualt location
    setInput("lagos")
  }
)
  }, [])
////////////////////////////////////////////////////





//// func to get onChange state of input 
const input_change = (event) => {
setInput(event.target.value)
}

///// func for btn_click to perform search func of the city in the input text
const btn_click = useCallback(() => {
  search(input)
  console.log("button clicked")
}, [input])




  return (
    <div className='weather'>
        <div className='search-bar'>
          <input type='text' placeholder='Search City' name="input" onChange={input_change }/>
          <img src={search_icon} alt='' onClick={btn_click}/>
        </div>
          <img src={weatherData.icon}  alt='weaher_pic' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}c</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='cols'>
              <img src={humidity_icon} alt=""/>
              <div>
                  <p>{weatherData.humidity}%</p>
                  <span>humidity</span>
              </div>
            </div>
            <div className='cols'>
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}Km/Hr</p>
                <span>wind speed</span>
              </div>
            </div>
          </div>
    </div>
  )
}
