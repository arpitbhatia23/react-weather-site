import React from 'react'

export default function Navbar(props) {
  return (
  <>
   <nav className="navbar navbar-expand-lg  fixed-top bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{props.navbarname}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">hourly-forecast</a>
        </li>
        <li className="nav-item ">
          <a className="nav-link " href="#"  >
          5 days forcast
          </a>
          
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" >weather map</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
</>
  )
}
