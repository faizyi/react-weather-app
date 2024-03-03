import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Weather from './component/weather app/weather';
import WeatherHistory from './component/weather history/weatherHistory';

function App() {
  return (
    <div>
      {/* <Weather/> */}
      <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Weather/>}/> */}
        <Route path='/react-weather-app' element={<Weather/>}/>
        {/* <Route path='/react-weather-app/weatherhistory' element={<Weather/>}/> */}
        <Route path='/weatherhistory' element={<WeatherHistory/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
