import './weathermap.css'
import React from 'react'
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer,TileLayer} from 'react-leaflet'
import { useState } from 'react';


export default function Weathermap() {
    const[position,setposition]=useState()
const geolocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const userLocation = [position.coords.latitude, position.coords.longitude];
console.log(userLocation)
    
  setposition(userLocation)
    })}
  // }
  ;useEffect(() => {
    geolocation();
  }, [])

    return(
      <MapContainer center={position} zoom={13}  style={{width:'70vw',height:'41vw'}}>
        <TileLayer 
  //  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         
      </MapContainer>
    )
}
