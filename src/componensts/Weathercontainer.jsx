import React from 'react'
import DateTimeComponent from '../currentlocation'
import Forcast from './Forcast'
export default function Weathercontainer() {
  return (
    <div>
<div className="container" >

  <DateTimeComponent/>
  <Forcast/>
  </div> 
  </div>
  )
}
