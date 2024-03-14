import React, { useState,useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css';
import {MapContainer,TileLayer,LayersControl,Marker,Popup, Tooltip} from 'react-leaflet'
import './weathermap.css'
import { Icon } from 'leaflet';
export default function Weathermap(){
const [position,setPosition]=useState()

const handleGetLocation =()=> {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (position && position.coords) {
     let coords={lat: position.coords.latitude,
        lon:position.coords.longitude}
        setPosition(coords);
        console.log(coords);
      } else {
        console.error("Error: Unable to retrieve position coordinates.");
      }
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
};

useEffect(() => {
 handleGetLocation();
}, []);

const[qeury,setquery]=useState('');
useEffect(()=>{
  if (mapRef.current &&position){
    mapRef.current.setView(position,11);
  }
},[position] )
const mapRef = useRef(null);
const search=async(city)=>{

  const APIKEY = 'e38b8adced5269e5111dc584c110097a';
 const endpoint=    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
 const response = await fetch(endpoint);
 let data = await response.json();
 if (data.coord) {
  const { lon, lat } = data.coord;
  const location = { lat, lon };
  setPosition(location);
  console.log(location, "loc");
} else {
  console.error("Error: Unable to retrieve location coordinates.");
}
setquery('')
};

  const handleKeyPress=()=>{
    if (event.key === 'Enter') {
      search(qeury);
    }
      
 };
 const handleSearch=()=>{
search(qeury)
 };

if (!position ) {
  return <div>Loading...</div>; // You can replace this with a loading indicator
}

    return(<React.StrictMode>
      <MapContainer  ref={mapRef} center={position}  zoom={11}  style={{width:'100vw',height:'96.5vh', position:'fixed', top:'3rem', left:'0',  }}>
      <LayersControl>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=AqYeNWgZfsp2BaEVyM6b'}
   />

          <Marker position={position} icon={new Icon({iconUrl: '/assets/maker.webp', iconSize: [45, 47], iconAnchor: [12, 41]})} >
     
        <Tooltip>location</Tooltip>

    </Marker>
    
   
    
    <LayersControl.Overlay  name='satelite'>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=AqYeNWgZfsp2BaEVyM6b'}
   />
    </LayersControl.Overlay>
    <LayersControl.Overlay  name='temp'>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e38b8adced5269e5111dc584c110097a'}
   />
    </LayersControl.Overlay>
    <LayersControl.Overlay  name='pressure'>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=e38b8adced5269e5111dc584c110097a'}
   />
    </LayersControl.Overlay>
    <LayersControl.Overlay  name='wind'>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=e38b8adced5269e5111dc584c110097a'}
   />
    </LayersControl.Overlay>
    <LayersControl.Overlay  name='clouds'>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=e38b8adced5269e5111dc584c110097a'}
   />
    </LayersControl.Overlay>
    <LayersControl.Overlay  name='precipitation'>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e38b8adced5269e5111dc584c110097a'}
   />
    </LayersControl.Overlay>
    
    

    </LayersControl>
    

      </MapContainer>
      <div className='search3'>          
    <input type ="text"  autoFocus onChange={(e)=>setquery(e.target.value)} value={qeury} placeholder="enter location here" onKeyPress={handleKeyPress}/>
    <button className="bx bx-search" onClick={handleSearch}></button>
    
</div>
      </React.StrictMode>
    )
}

