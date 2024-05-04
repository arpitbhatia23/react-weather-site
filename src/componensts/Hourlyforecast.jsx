import React, { useState ,useEffect } from 'react';
import DateTimeComponent from '../currentlocation';
import './hourlyforecast.css'
import { useSelector } from 'react-redux';
export default function Hourlyforecast(props) {
  
  const newcity = useSelector(state=>state.data)
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

      if (typeof newcity === 'string') {
      endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city || newcity }&units=metric&exclude=current,minutely,hourly,alerts&&appid=${APIKEY}` 
            endpoint1=    `https://api.openweathermap.org/data/2.5/weather?q=${city || newcity}&units=metric&appid=${APIKEY}`;;
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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&&appid=${APIKEY}`);
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
    useEffect(() => {

    } ,[qeury]);
      useEffect(() => {
        if(newcity){
        search();}
        else{
          getCurrentLocationWeather()
        }
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
              setimg(<img src="/assets/clouds-raining.gif"/>);
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
          setimg(<img src="/assets/clouds-raining.gif"/>);
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
 
  const rendertime=(index)=>{
    const timestamp = weather && weather.list && weather.list[index] && weather.list[index].dt_txt;
    const date = new Date(timestamp);
    const weekday = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',  hour12: true, weekday:"short" });
   
  return(
    <span className='time'>{weekday}</span>
  
  )};

  const renderAcco = (index) => (
    <div className={`acco ${activeIndex === index ? 'active' : ''}`}>
      <span className='feellike'><span className='feellikeicon'><i className="fa-solid fa-temperature-low"></i></span>{weather && weather.list && weather.list[index] && weather.list[index].main.feels_like}°C</span>
      <span className='hourlywind'><span className='windicon'><i className="fa-solid fa-wind"></i></span> {weather && weather.list && weather.list[index] && weather.list[index].wind.speed}km/hr</span>
      <span className='rainchances'> <span className='rainicon'><i className="fa-solid fa-cloud-showers-heavy"></i></span> {parseInt(weather && weather.list && weather.list[index] && weather.list[index].pop*100)}%</span>
      <span className='pressure'> <span className='pressureicon'><i className="bx bx-tachometer"></i></span> {weather && weather.list && weather.list[index] && weather.list[index].main.pressure}hpa</span>

    </div>
  );
  if(weather){
  return (
    // create a container
    <div className='container' >
{/* // create a searchbar or search button */}
     <div className='search1'>          
    <input type ="text" onChange={(e)=>setquery(e.target.value)} value={qeury} placeholder="enter location here" onKeyPress={handleKeyPress}/>
    <button className="bx bx-search" onClick={handleSearch}></button>
    
</div>
{/* // create inner container2 in container to show  background image & set time & date using date time component */}
<div className='container2'style={{ backgroundImage:backgroundImage }}><DateTimeComponent/> 
{/* // show city name in container 2 */}
<div className='city'> {weather1&&weather1.name},{ weather1&&weather1.sys.country}</div>
<p>{error}</p>
    
</div>
{/* // display hourly forcaste title */}
  <div className='title'>
    <span id='title'>hourly forecast</span>
    </div>
    {/* // add a scrolling effect */}
    <div className='scroll'>
      {/* // display hourly weather report */}
    <div className='hours' >
    <span className='time'>{rendertime(0)}</span>
    <span className="hourlytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt( weather && weather.list && weather.list[0] && weather.list[0].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[0] && air.list[0].main && air.list[0].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[0] && weather.list[0].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(0)}></i> 
     {activeIndex === 0 && renderAcco(0)}

     </div>
      
     <div className='hours2'>
     <span className='time'>{rendertime(1)}</span>
    <span className="hourlytemp"> <span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[1] && weather.list[1].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[1] && air.list[1].main && air.list[1].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[1] && weather.list[1].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(1)}></i>
     {activeIndex === 1 && renderAcco(1)}

     </div>
     <div className='hours3'>
     <span className='time'>{rendertime(2)}</span>
    <span className="hourlytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[2] && weather.list[2].main.temp)}°C</span>
    <span className='aqi'> level {air && air.list && air.list[2] && air.list[2].main && air.list[2].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[2] && weather.list[2].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(2)}></i>
     {activeIndex === 2 && renderAcco(2)}

     </div>
     <div className='hours4'>
     <span className='time'>{rendertime(3)}</span>
    <span className="hourlytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[3] && weather.list[3].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[3] && air.list[3].main && air.list[3].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[3] && weather.list[3].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(3)}></i>
     {activeIndex === 3 && renderAcco(3)}

     </div>
     <div className='hours5'>
     <span className='time'>{rendertime(4)}</span>
    <span className="hourlytemp"><span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[4] && weather.list[4].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[4] && air.list[4].main && air.list[4].main.aqi} AQI</span>
 <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[4] && weather.list[4].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(4)}></i>
     {activeIndex === 4 && renderAcco(4)}
     </div> 

     <div className='hours6'>
     <span className='time'>{rendertime(5)}</span>
    <span className="hourlytemp"> <span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[5] && weather.list[5].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[5] && air.list[5].main && air.list[5].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[5] && weather.list[5].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(5)}></i>
     {activeIndex === 5 && renderAcco(5)}

     </div>
     <div className='hours7'>
     <span className='time'>{rendertime(6)}</span>
    <span className="hourlytemp"> <span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[6] && weather.list[6].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[6] && air.list[6].main && air.list[6].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[6] && weather.list[6].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(6)}></i>
     {activeIndex === 6 && renderAcco(6)}

     </div>
     <div className='hours8'>
     <span className='time'>{rendertime(7)}</span>
    <span className="hourlytemp"> <span className='tempicon'><i className="fa-solid fa-temperature-three-quarters"></i></span>{parseInt(weather && weather.list && weather.list[7] && weather.list[7].main.temp)}°C</span> 
    <span className='aqi'> level {air && air.list && air.list[7] && air.list[7].main && air.list[7].main.aqi} AQI</span>
     <span className='hourlyhumidity'><span className='humidityicon'><i className="fa-solid fa-droplet"></i></span>{weather && weather.list && weather.list[7] && weather.list[7].main.humidity}%</span>
     <i className="fa-solid fa-caret-down" onClick={()=>handelclicktogg(7)}></i>
     {activeIndex === 7 && renderAcco(7)}

     </div>

     </div>
     {/* display that data is loading */}
     <p className='loading'> {loading&&'loading..'}</p>

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