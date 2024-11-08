import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import raining_icon from '../assets/raining.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sun.png'
import wind_icon from '../assets/wind.png'
// cd WeatherApp
//npm  run dev
const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons ={
        "01d":sun_icon,
        "01n":sun_icon,
        "02d":cloudy_icon,
        "02n":cloudy_icon,
        "03d":cloudy_icon,
        "03n":cloudy_icon,
        "04d":cloudy_icon,
        "04n":cloudy_icon,
        "09d":drizzle_icon,
        "09n":drizzle_icon,
        "10d":raining_icon,
        "10n":raining_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }

    const search = async (city)=> {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{

            //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`; - this does not work
            //the api key most be write in here not in the env
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f2607e1184acc312ef21f2991a0c1a7b`;
            console.log("API Key:", import.meta.env.VITE_APP_ID);//this call the fetch(url)
            console.log("API URL:", url);//this substitute the fetch url
            

            const response = await fetch(url);// this might be working but not sure
            const data = await response.json();

            if(!response.ok){  alert(data.message);
                return;
            }
               


            console.log(data);
            //console.log(import.meta.env.VITE_APP_ID);// this import the import.meta.env.VITE_APP_ID directly but did not work

            const icon = allIcons[data.weather[0].icon] || sun_icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        }catch (error){
            setWeatherData(false);
            console.error("Error in fetching weather data")

        }
    }
    useEffect(()=>{
        search("New Jersey");
    },[])

  return (
    <div className='wether'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°f</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt=''/>
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt=''/>
            <div>
                <p>{weatherData.windSpeed} mph</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
        
        </>:<></>}

     
    </div>
  )
}

export default Weather
