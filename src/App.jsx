import './App.css'
import Hourlyforecast from './componensts/Hourlyforecast'
import Navbar from './componensts/Navbar'
import Forcast from './componensts/Forcast'
import { BrowserRouter as Router,
Route,Routes } from 'react-router-dom';
import Dayforecast from './componensts/Dayforecast';
import WeatherMap from './componensts/Weathermap';
function App() {

  

  return (
    <>
    <Router>
    <Navbar navbarname="weather forecasting" />
    <Routes>
    <Route path='/' element={<Forcast/>}/>
    <Route path='/hourlyforecast' element={<Hourlyforecast/>}/>
    <Route path='/5dayforecast' element={<Dayforecast/>}/>
    <Route path='/Weathermap' element={<WeatherMap/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
