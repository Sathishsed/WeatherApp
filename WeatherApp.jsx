import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
const WeatherApp = () => {
    let api_key = "b5b7e50cf7a0f20ffcf9c162e8f5e3cc";
    const [wicon, setwicon] = useState(cloud_icon);
    const search = async () => {
        const element = document.getElementsByClassName("cityinput");
        if (element[0].value === "") {
          return 0;
        }
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
        try {
          let response = await fetch(URL);
          if (response.ok) {
            let data = await response.json();
            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");
      
            humidity[0].innerHTML = data.main.humidity+"%";
            wind[0].innerHTML = data.wind.speed+"km/hr";
            temperature[0].innerHTML = `${Math.floor(data.main.temp)}°C`;
            location[0].innerHTML = data.name;

            if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
            {
                setwicon(clear_icon);
            }
            else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
            {
                setwicon(cloud_icon);
            }
            else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
            {
                setwicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
            {
                setwicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
            {
                setwicon(rain_icon);
            }
            else if(data.weather[0].icon==="010d" || data.weather[0].icon==="010n")
            {
                setwicon(rain_icon);
            }
            else if(data.weather[0].icon==="013d" || data.weather[0].icon==="013n")
            {
                setwicon(snow_icon);
            }
            else{
                setwicon(clear_icon);
            }
          } else {
            console.error("API request failed with status: " + response.status);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      
  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityinput" placeholder='search' />
            <div className="search-icon" onClick={()=> {search()}}>
                <img src={search_icon} alt=''/>
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt=''/>
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default WeatherApp
