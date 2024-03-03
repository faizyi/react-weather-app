import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import SearchIcon from '@mui/icons-material/Search';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import PlaceIcon from '@mui/icons-material/Place';
import CloudIcon from '@mui/icons-material/Cloud';
import clear from './../../component/weather img/clear.png'
import clouds from './../../component/weather img/cloud.png'
import haze from './../../component/weather img/haze.png'
import mist from './../../component/weather img/mist.png'
import rain from './../../component/weather img/rain.png'
import snow from './../../component/weather img/snow.png'
import smoke from './../../component/weather img/smoke.png'
import history from './../../component/weather img/history.png'
import './weather.css'
import { Link } from 'react-router-dom';
function Weather() {
  const [inputText, setInputText] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [backgroundColor, setBackgroundColor] = useState({});
  const [weatherImg, setWeatherImg] = useState();
  const [loader, setLoader] = useState(false);

  let allWeather = [];
  let weather = localStorage.getItem('weather')
  if (weather !== null) {
    allWeather = JSON.parse(weather)
  }

  // <historyContext.Provider value={weather}>
  //  <WeatherHistory/>
  // </historyContext.Provider>

  useEffect(() => {
    if (!inputText == '') {
      searchCity()
    }
  }, [])
  async function searchCity() {
    setLoader(true)
    const date = new Date();
    const getDate = date.toDateString()
    const getTime = date.toLocaleTimeString()
    try {
      const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputText}&appid=f2bf8ca0636aba5e7b0b2ce55bfa486b`)
      const data = await respone.json();
      setWeatherData(data);
      if (data.cod == '404') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Oops! City not found. Please check the city name."
        });
        setLoader(false)
        setBackgroundColor({
          backgroundColor: ''
        })
      }
      // allWeather.push([getDate, getTime, data.name, `${Math.floor(data.main.temp)}°`])
      allWeather.push({
        date: getDate,
        time: getTime,
        city: data.name,
        temp: `${Math.floor(data.main.temp)}°`
      })
      // allWeather.push(data.main.temp)
      localStorage.setItem('weather', JSON.stringify(allWeather));
      // console.log(data);

       if (data.weather[0].main == 'Clear') {
        setBackgroundColor({
          backgroundColor: '#ADD8E6'
        })
        setWeatherImg(clear)
      } else if (data.weather[0].main == 'Rain') {
        setBackgroundColor({
          backgroundColor: '#A9A9A9'
        })
        setWeatherImg(rain)
      } else if (data.weather[0].main == 'Snow') {
        setBackgroundColor({
          backgroundColor: '#FFFAFA'
        })
        setWeatherImg(snow)
      } else if (data.weather[0].main == 'Clouds') {
        setBackgroundColor({
          backgroundColor: ' #B0C4DE'
        })
        setWeatherImg(clouds)
      } else if (data.weather[0].main == 'Mist') {
        setBackgroundColor({
          backgroundColor: ' #E0FFFF'
        })
        setWeatherImg(mist)
      } else if (data.weather[0].main == 'Haze') {
        setBackgroundColor({
          backgroundColor: '#e0e0e0'
        })
        setWeatherImg(haze)
      } else if (data.weather[0].main == 'Smoke') {
        setBackgroundColor({
          backgroundColor: '#f5f5f5'
        })
        setWeatherImg(smoke)
      }
      setLoader(false)
    }
    catch (error) {
      // Swal.fire("Location not Found!");
    }
    setInputText('')

  }

  return (
    <div>
      <div style={backgroundColor} className='weather-app'>
        <div className='header'>
          <div className='heading'>
            <h1>Weather App</h1>
            <h1 className='icon'>{<CloudIcon />}</h1>
          </div>
          <div className='search'>
            <form onSubmit={(e) => searchCity(e.preventDefault())}>
              <p>{<PlaceIcon />}</p>
              <input
                required
                type="text"
                placeholder="Enter Your Location"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type='submit'>{<SearchIcon />}</button>
            </form>
          </div>
        </div>

        {
          loader ? <div className='loader'><img width={'100px'} src={'https://assets.materialup.com/uploads/b68f4460-aaa9-4e19-99d8-232dfea1c537/preview.gif'} alt="" /></div> :
            <div>
              {
                typeof weatherData.main !== 'undefined' ? (
                  <div className='weather-data'>

                    <div className='weather'>

                      <div className='weather-img'>
                        <img src={weatherImg} alt="" />
                      </div>

                      <div className='name'>
                        <h1>{weatherData.name}</h1>
                      </div>

                      <div className='temp'>
                        <p>{Math.floor(weatherData.main.temp)}<sup>°C</sup></p>
                      </div>

                      <div className='desc'>
                        <p>{weatherData.weather[0].description}</p>
                      </div>

                      <div className='weather-desc'>
                        <div className='humidity'>
                          <div className='icon'>
                            <p>{<WaterIcon />}</p>
                          </div>

                          <div className='desc'>
                            <p>{weatherData.main.humidity}%</p>
                            <p>Humidity</p>
                          </div>
                        </div>

                        <div className='speed'>
                          <div className='icon'>
                            <p>{<AirIcon />}</p>
                          </div>

                          <div className='desc'>
                            <p>{Math.floor(weatherData.wind.speed)}Km/h</p>
                            <p>Wind Speed</p>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                ) : (
                  <div className='weather-data'>

                  <div className='weather'>

                    <div className='weather-img'>
                      <img src={clouds} alt="" />
                    </div>

                    <div className='name'>
                      <h2>Check Current Weather</h2>
                    </div>

                    <div className='temp'>
                      <p>00<sup>°C</sup></p>
                    </div>

                    <div className='desc'>
                      <p></p>
                    </div>

                    <div className='weather-desc'>
                      <div className='humidity'>
                        <div className='icon'>
                          <p>{<WaterIcon />}</p>
                        </div>

                        <div className='desc'>
                          <p>%</p>
                          <p>Humidity</p>
                        </div>
                      </div>

                      <div className='speed'>
                        <div className='icon'>
                          <p>{<AirIcon />}</p>
                        </div>

                        <div className='desc'>
                          <p>Km/h</p>
                          <p>Wind Speed</p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
                   )
              }
            </div>
        }

        <div className='weather-history'>
          <Link to={'/weatherhistory'}>
            <div>
              <button>Weather History</button>
              <img width={'30px'} src={history} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Weather