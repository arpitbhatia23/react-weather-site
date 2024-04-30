import React, { useState ,useEffect } from 'react';
import DateTimeComponent from '../currentlocation';
import './dayforecast.css'
export default function Dayforecast(props) {
  const [activeIndex, setactiveIndex] = useState(null);
  const[qeury,setquery]=useState('');
    const[weather,setweather]=useState();
    const[weather1,setweather1]=useState();
    const[air,setair]=useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [img,setimg]=useState()
    const [backgroundImage, setBackgroundImage] = useState('');

   

        const search=async(city)=>{
             try{setLoading(true);
      const APIKEY = 'e38b8adced5269e5111dc584c110097a';
      let endpoint;
      let endpoint1;
      let endpoint2;
      if (typeof city === 'string') {
        // If location is a string, treat it as a city name
      endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKEY}` 
            endpoint1=    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
            const response1 = await fetch(endpoint1);
            let data1 = await response1.json();
            const{lon,lat}=data1.coord
            endpoint2=`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`

        
      }  else {
        throw new Error('Invalid location format');
      }
      const response = await fetch(endpoint); 
      const response1 = await fetch(endpoint1); 
      const response2 = await fetch(endpoint2); 

       if(!response.ok){
          throw new Error('weather data not found')
       }setLoading("loading..")
   


        let data = await response.json();
        let data1 = await response1.json();
        
        let data2 = await response2.json();
      setweather(data);
      setweather1(data1);
      setair(data2)
      setquery("");
      setError('');
      

    }
     
      catch(error){
          console.error('Error fetching weather data:', error.message); 
          setError('city not found. Please try again');
          setquery('')
        }finally {
            setLoading(false);
          }
    };
    const handleSearch = () => {
      search(qeury);
    }; 
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        search(qeury);
      }
    };
    const getCurrentLocationWeather = async () => {
      try {
        setLoading(true);
        setError('');
        setimg('')
        const APIKEY = 'e38b8adced5269e5111dc584c110097a';

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKEY}`);
        const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`);
        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`);

        if (!response.ok) {
          throw new Error('Weather data not found');
        }setError("")
        
    
        const json = await response.json();
        const json1 = await response1.json();
        const json2 = await response2.json();

        setweather(json);
        setweather1(json1);
        setair(json2)
      } catch (error) {
        console.error('Error getting location or fetching weather data:', error.message);
          setError('Unable to get your current location or fetch weather data. Please try again.');
      } finally {
        setLoading(false);
        
      }
    };
    // useEffect(() => {

    // navigate("/",{state:{id:qeury}})
    // } ,[qeury]);

      useEffect(() => {
        getCurrentLocationWeather();
      }, []);
      useEffect(() => {
        if (weather && weather.list && weather.list[0] && weather.list[0].weather[0]&&weather.list[0].weather[0].main) {
      switch (weather && weather.list && weather.list[0] && weather.list[0].weather[0]&&weather.list[0].weather[0].main) {
        case 'Clear':
            setimg(<img src="/assets/clear.webp"/>);
            setBackgroundImage('url("/assets/backgrounds/clear-background.webp")');           // audioElement.src ='sound effects/clear.mp3';
            break;
        case 'Rain':
          setimg(<img src="/assets/rain.webp"/>);
          setBackgroundImage('url("/assets/backgrounds/rain-background.webp")');           // audioElement.src = 'sound effects/rain.mp3';
           
            break;
            case 'Storm':
              setimg(<img src="/assets/clouds-raining.webp"/>);
              setBackgroundImage('url("/assets/backgrounds/rain-background.webp")');           // audioElement.src = 'sound effects/strom.mp3';

            break;
        case 'Snow':
          setimg(<img src="/assets/snow.webp"/>);
          setBackgroundImage('url("/assets/backgrounds/snow-background.webp")');         // audioElement.src = 'sound effects/snow.mp3';

            break;
        case 'Clouds':
          setimg(<img src="/assets/cloud.webp"/>);
          setBackgroundImage('url("/assets/backgrounds/clouds-background.webp")');          //  audioElement.src = 'sound effects/clear.mp3';
          
            break;
        case 'Mist':
          setimg(<img src="/assets/mist.webp"/>);
          setBackgroundImage('url("/assets/backgrounds/mist-background.webp")');          //audioElement.src = 'sound effects/fog.mp3';
          break;

        case 'Haze':
          setimg(<img src="/assets/mist.webp"/>);
          setBackgroundImage('url("/assets/backgrounds/haze-background.webp")');          // audioElement.src = 'sound effects/fog.mp3';

            break;
            case 'Fog':
              setimg(<img src="/assets/mist.webp"/>);
              setBackgroundImage('url("/assets/backgrounds/mist-background.webp")');              //  audioElement.src = 'sound effects/fog.mp3';
       break;
       case 'Smoke':
        setimg(<img src="/assets/mist.webp"/>);
        setBackgroundImage('url("/assets/backgrounds/haze-background.webp")');              //  audioElement.src = 'sound effects/fog.mp3';
        break;
        case 'Thunderstorm':
          setimg(<img src="/assets/clouds-raining.webp"/>);
          setBackgroundImage('url("/assets/backgrounds/rain-background.webp")');           // audioElement.src = 'sound effects/strom.mp3';

        break;
       

            default:
              setimg(<img src="/assets/clear.webp"/>);
              setBackgroundImage('url("/assets/backgrounds/defaultbackground.webp")');              //  audioElement.src = 'sound effects/fog.mp3';

            break;
    }
  }
  },[weather]);
 
  

  const handelclicktogg = (index) => {
    
    setactiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
 
const renderday=(index)=>{
  const timestamp = weather && weather.list && weather.list[index] && weather.list[index].dt_txt;
  const date = new Date(timestamp);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
 
return(
  <span className='time'>{weekday}</span>

)
}
  
  const renderAcco = (index) => {
   
    return (
      <div className={`acco ${activeIndex === index ? 'active' : ''}`}>
        <span className='feellike'><span className='feellikeicon'><i className="fa-solid fa-temperature-low"></i></span>{weather && weather.list && weather.list[index] && weather.list[index].main.feels_like}°C</span>
        <span className='daywind'><span className='windicon'><i className="fa-solid fa-wind"></i></span> {weather && weather.list && weather.list[index] && weather.list[index].wind.speed}km/hr</span>
        <span className='rainchances'> <span className='rainicon'><i className="fa-solid fa-cloud-showers-heavy"></i></span> {parseInt(weather && weather.list && weather.list[index] && weather.list[index].pop*100)}%</span>
        <span className='pressure'> <span className='pressureicon'><i className="bx bx-tachometer"></i></span> {weather && weather.list && weather.list[index] && weather.list[index].main.pressure}hpa</span>
      </div>
    );
  };
  if(weather){
  return (
    <div className='container' >

     <div className='search1'>          
    <input type ="text" onChange={(e)=>setquery(e.target.value)} value={qeury} placeholder="enter location here" onKeyPress={handleKeyPress}/>
    <button className="bx bx-search" onClick={handleSearch}></button>
    
</div>
<div className='container2'style={{ backgroundImage:backgroundImage }}><DateTimeComponent/> 
<div className='city'> {weather1&&weather1.name },{ weather1&&weather1.sys.country}</div>
<p>{error}</p>

</div>
  <div className='title'>
    <span id='title'>day forecast</span>
    </div>
    <div className='scroll'>
    <div className='day' >
    <span className='time'>{renderday(0)}</span>
 
    <span className="daytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[0] && weather.list[0].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[0] && air.list[0].main && air.list[0].main.aqi} AQI</span>
     <span className='dayhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[0] && weather.list[0].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(0)}></i> 
     {activeIndex === 0 && renderAcco(0)}

     </div>
      
     <div className='day2'>
    <span className='time'>{renderday(8)}</span>
    <span className="daytemp"> <span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[8] && weather.list[8].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[0] && air.list[0].main && air.list[0].main.aqi} AQI</span>
     <span className='dayhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[8] && weather.list[8].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(8)}></i>
     {activeIndex === 8 && renderAcco(8)}

     </div>
     <div className='day3'>
    

    <span className='time'>{renderday(16)}</span>
    <span className="daytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[16] && weather.list[16].main.temp)}°C</span>
    <span className='aqi'> level {air && air.list && air.list[0] && air.list[0].main && air.list[0].main.aqi} AQI</span>
     <span className='dayhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[16] && weather.list[16].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(16)}></i>
     {activeIndex === 16 && renderAcco(16)}

     </div>
     <div className='day4'>
    <span className='time'>{renderday(24)}</span>
    <span className="daytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[24] && weather.list[24].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[0] && air.list[0].main && air.list[0].main.aqi} AQI</span>
     <span className='dayhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[24] && weather.list[24].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(24)}></i>
     {activeIndex === 24 && renderAcco(24)}

     </div>
     <div className='day5'>
    <span className='time'>{renderday(32)}</span>
    <span className="daytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[32] && weather.list[32].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[0] && air.list[0].main && air.list[0].main.aqi} AQI</span>
     <span className='dayhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[32] && weather.list[32].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(32)}></i>
     {activeIndex === 32 && renderAcco(32)}

     </div>
    
     </div>
     <p className='loading'> {loading&&'loading.....'}</p>
     </div>
  )}
  else {
    return (
      <>
      <div className=' container3'>
      <div className='loader'>
        <img  className="loaderimg"src='/assets/WeatherIcons.gif'  />
      

        <h3 style={{ color: "white", fontSize:'2vw' ,fontWeight: "400",  marginTop:"20vmax"}}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white",fontSize:'2vw', marginTop: "2vmax"  }}>
          Your current location wil be displayed on the App <br></br> & used
          for calculating Real time weather.
        </h3>
        </div>
        </div>
      </>
    );
  }
}
