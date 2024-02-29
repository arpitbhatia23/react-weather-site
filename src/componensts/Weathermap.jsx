import './weathermap.css'
import React, { useState,useEffect } from 'react'
import 'leaflet/dist/leaflet.css';
import {MapContainer,TileLayer,LayersControl,Marker,Popup} from 'react-leaflet'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';


export default function Weathermap(){
const[qeury,setquery]=useState()
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

const handleSearch = () => {
  search(qeury);
};  
// when  we click on enter this fuction run
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    search(qeury);
  }
};
if (!position) {
  return <div>Loading...</div>; // You can replace this with a loading indicator
}

    return(<>
      <MapContainer center={position} zoom={13}  style={{width:'60vw',height:'41vw',display:'flex',marginTop:'3vw'}}>
      <LayersControl>
        <TileLayer 
   attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" >&copy; OpenStreetMap contributors</a> <a href="https://openweathermap.org/copyright">&copy; openweather contributors'
   url={'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=AqYeNWgZfsp2BaEVyM6b'}
   />

          <Marker position={position}>
      <Popup>
your location
      </Popup>
    </Marker>
    
    {/* <GeoSearchControl
        provider={new OpenStreetMapProvider()}
        showMarker={true}
        showPopup={false}
        maxMarkers={1}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={true}
      /> */}
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
      <div className='search1'>          
    <input type ="text" onChange={(e)=>setquery(e.target.value)} value={qeury} placeholder="enter location here" onKeyPress={handleKeyPress}/>
    <button className="bx bx-search" onClick={handleSearch}></button>
    
</div>
     
      </>
    )
}

