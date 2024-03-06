import { useState,useEffect } from 'react';
import DateTimeComponent from '../currentlocation';
import './forcast.css'
export default function Forcast() {
  // Example structure of hourlyData



    const[qeury,setquery]=useState('');
    const[weather,setweather]=useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [img,setimg]=useState()
    const [backgroundImage, setBackgroundImage] = useState('');
    // const navigate=useNavigate();

   

        const search=async(city)=>{
             try{setLoading(true);
      const APIKEY = 'e38b8adced5269e5111dc584c110097a';
      let endpoint;

      if (typeof city === 'string') {
        // If location is a string, treat it as a city name
        endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
      }
       else {
        throw new Error('Invalid location format');
      }
      const response = await fetch(endpoint); 
       
       if(!response.ok){
          throw new Error('weather data not found')
       }setLoading("loading..")
   


        let data = await response.json();
      setweather(data);
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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKEY}`);
        
        if (!response.ok) {
          throw new Error('Weather data not found');
        }setError("")
        
    
        const json = await response.json();
        setweather(json);
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
        if (weather && weather.weather && weather.weather[0].main) {
      switch (weather&& weather.weather&& weather.weather[0].main) {
        case 'Clear':
            setimg(<img src="/assets/clear.png"/>);
            setBackgroundImage('url("/assets/backgrounds/clear-background.jpg")');           // audioElement.src ='sound effects/clear.mp3';
            break;
        case 'Rain':
          setimg(<img src="/assets/rain.png"/>);
          setBackgroundImage('url("/assets/backgrounds/rain-background.jpg")');           // audioElement.src = 'sound effects/rain.mp3';
           
            break;
            case 'Storm':
              setimg(<img src="/assets/clouds-raining.gif"/>);
              setBackgroundImage('url("/assets/backgrounds/rain-background.jpg")');           // audioElement.src = 'sound effects/strom.mp3';

            break;
        case 'Snow':
          setimg(<img src="/assets/snow.png"/>);
          setBackgroundImage('url("/assets/backgrounds/snow-background.jpg")');         // audioElement.src = 'sound effects/snow.mp3';

            break;
        case 'Clouds':
          setimg(<img src="/assets/cloud.png"/>);
          setBackgroundImage('url("/assets/backgrounds/clouds-background.jpg")');          //  audioElement.src = 'sound effects/clear.mp3';
          
            break;
        case 'Mist':
          setimg(<img src="/assets/mist.png"/>);
          setBackgroundImage('url("/assets/backgrounds/mist-background.jpg")');          //audioElement.src = 'sound effects/fog.mp3';
          break;

        case 'Haze':
          setimg(<img src="/assets/mist.png"/>);
          setBackgroundImage('url("/assets/backgrounds/haze-background.webp")');          // audioElement.src = 'sound effects/fog.mp3';

            break;
            case 'Fog':
              setimg(<img src="/assets/mist.png"/>);
              setBackgroundImage('url("/assets/backgrounds/mist-background.jpg")');              //  audioElement.src = 'sound effects/fog.mp3';
       break;
       case 'Smoke':
        setimg(<img src="/assets/mist.png"/>);
        setBackgroundImage('url("/assets/backgrounds/haze-background.webp")');              //  audioElement.src = 'sound effects/fog.mp3';
        break;
        case 'Thunderstorm':
          setimg(<img src="/assets/clouds-raining.gif"/>);
          setBackgroundImage('url("/assets/backgrounds/rain-background.jpg")');           // audioElement.src = 'sound effects/strom.mp3';

        break;
       

            default:
              setimg(<img src="/assets/clear.png"/>);
              setBackgroundImage('url("/assets/backgrounds/defaultbackground.jpg")');              //  audioElement.src = 'sound effects/fog.mp3';

            break;
    }
  }
  },[weather]);
  
if(weather)
  return ( 
    <> 
    <div className="container"> 
      <div className='container2'style={{ backgroundImage: backgroundImage }}><DateTimeComponent/> 
      <div className='city'> {weather&&weather.name},{ weather&&weather.sys.country}</div>
<div className='temp'> {weather&&weather.main&&weather.main.temp}°C</div>
<p>{error}</p>
</div>    
      <div className='search'>          
    <input type ="text" onChange={(e)=>setquery(e.target.value)} value={qeury} placeholder="enter location here" onKeyPress={handleKeyPress}/>
    <button className="bx bx-search" onClick={handleSearch}></button>
    
</div>
<div className='weather-details'>{weather && weather.weather && weather.weather[0] && weather.weather[0].description}</div>
<div className='icon'>{img}</div>
<div className='line'></div>
<div className='line2'></div>
<div className='city2'>{weather&&weather.name},{ weather&&weather.sys.country}</div>
<div className='line3'></div>
<div className='temp1'>temp <span className='span-temp'>{weather&&weather.main&&weather.main.temp}°C</span></div>
<div className='line4'></div>
<div className='humidity'>humidity <span className='span-humidity'>{weather&&weather.main&&weather.main.humidity}%</span></div>
<div className='line5'></div>
<div className='wind'>wind<span className='span-wind'>{weather&&weather.wind&&weather.wind.speed}km/hr</span></div>
<div className='line6'></div>
<p className='loading'> {loading&&'loading..'}</p>
<div className='line7'></div>

    </div>
    </>
  )
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

