import React from 'react'
import { useState,useEffect } from 'react';
export default function Forcast() {
    const[qeury,setquery]=useState('');
    const[weather,setweather]=useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [img,setimg]=useState()
    const [backgroundImage, setBackgroundImage] = useState('');
        const search=async(city)=>{
      try{
      const APIKEY = 'e38b8adced5269e5111dc584c110097a';
      let endpoint;

      if (typeof city === 'string') {
        // If location is a string, treat it as a city name
        endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
      } else if (locat.lat && locat.lon) {
        // If location has lat and lon properties, treat it as lat lon
        endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${locat.lat}&lon=${locat.lon}&units=metric&appid=${APIKEY}`;
      } else {
        throw new Error('Invalid location format');
      }
      const response = await fetch(endpoint); 
       
       if(!response.ok){
          throw new Error('weather data not found')
       }
        let data = await response.json();
      setweather(data);
      setquery("")}
      catch(error){
          console.error('Error fetching weather data:', error.message); 
          setError('Weather data not found. Please try again.');
        }finally {
            setLoading(false);
          }
    };
    const getCurrentLocationWeather = async () => {
      try {
        setLoading(true);
        setError('');
        const APIKEY = 'e38b8adced5269e5111dc584c110097a';

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKEY}`);
        
        if (!response.ok) {
          throw new Error('Weather data not found');
        }
    
        const json = await response.json();
        setweather(json);
      } catch (error) {
        console.error('Error getting location or fetching weather data:', error.message);
        setError('Unable to get your current location or fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
      useEffect(() => {
        getCurrentLocationWeather();
      }, []);
      useEffect(() => {
        if (weather && weather.weather && weather.weather[0].main) {
      switch (weather&& weather.weather&& weather.weather[0].main) {
        case 'Clear':
            setimg(<img src="src/assets/clear.png"/>);
            setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');           // audioElement.src ='sound effects/clear.mp3';
            break;
        case 'Rain':
          setimg(<img src="src/assets/rain.png"/>);
          setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');           // audioElement.src = 'sound effects/rain.mp3';
           
            break;
            case 'Storm':
              setimg(<img src="src/assets/clouds-raining.gif"/>);
              setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');           // audioElement.src = 'sound effects/strom.mp3';

            break;
        case 'Snow':
          setimg(<img src="src/assets/snow.png"/>);
          setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');         // audioElement.src = 'sound effects/snow.mp3';

            break;
        case 'Clouds':
          setimg(<img src="src/assets/cloud.png"/>);
          setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');          //  audioElement.src = 'sound effects/clear.mp3';
          
            break;
        case 'Mist':
          setimg(<img src="src/assets/mist.png"/>);
          setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');          //audioElement.src = 'sound effects/fog.mp3';
          break;

        case 'Haze':
          setimg(<img src="src/assets/mist.png"/>);
          setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');          // audioElement.src = 'sound effects/fog.mp3';

            break;
            case 'Fog':
              setimg(<img src="src/assets/mist.png"/>);
              setBackgroundImage('url("src/assets/backgrounds/clear-background.jpg")');              //  audioElement.src = 'sound effects/fog.mp3';
       break;
       case 'Smoke':
        setimg(<img src="src/assets/mist.png"/>);
        setBackgroundImage('url("images/defaultbackground.jpg")');               // audioElement.src = 'sound effects/fog.mp3';
       break;
       
            default:
              setimg(<img src="src/assets/clear.png"/>);
              setBackgroundImage('url("images/defaultbackground.jpg")');        //  audioElement.src = 'sound effects/clear.mp3';

            break;
    }
  }
  },[weather]);
  return (
    <div style={{ backgroundImage: backgroundImage }}>        
      <div className='search'>          
    <input type ="text" onChange={(e)=>setquery(e.target.value)} value={qeury} placeholder="enter your location"/>
    <button className="bx bx-search" onClick={()=>search(qeury)}></button>
    
</div>
<div className='city'> {weather&&weather.name},{ weather&&weather.sys.country}</div>
<div className='temp'> {weather&&weather.main&&weather.main.temp}°C</div>
<div className='weather-details'>{weather && weather.weather && weather.weather[0] && weather.weather[0].description}</div>
<div className='icon'>{img}</div>
<div className='line'></div>
<div className='line2'></div>
<div className='city2'>{weather&&weather.name},{ weather&&weather.sys.country}</div>
<div className='line3'></div>
<div className='temp1'>temperatue <span className='span-temp'>{weather&&weather.main&&weather.main.temp}°C</span></div>
<div className='line4'></div>
<div className='humidity'>humidity <span className='span-humidity'>{weather&&weather.main&&weather.main.humidity}%</span></div>
<div className='line5'></div>
<div className='wind'>wind<span className='span-wind'>{weather&&weather.wind&&weather.wind.speed}km/hr</span></div>
<div className='line6'></div>
     
    </div>
  )
}
