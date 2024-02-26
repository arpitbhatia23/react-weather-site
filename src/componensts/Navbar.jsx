import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
  <>
   <nav className="navbar navbar-expand-lg  fixed-top bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">{props.navbarname}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hourlyforecast">hourly-forecast</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to="/5dayforecast"  >
          5 days forcast
          </Link>
          
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/weathermap' >weather map</Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
</>
  )
}
