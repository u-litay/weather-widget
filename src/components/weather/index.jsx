import React, { useEffect, useState } from 'react'
import { useGetCurrentWeatherQuery, useGetForecastQuery } from './weatherApi';
import './index.css'
import Modal from "./Modal.jsx"

import { ReactComponent as MoonSvg } from '../../assets/svgs/moon_2.svg'
import { ReactComponent as SunSvg } from '../../assets/svgs/sun_2.svg'
import { ReactComponent as CloudSvg } from '../../assets/svgs/cloud_2.svg'
import { ReactComponent as RainSvg } from '../../assets/svgs/cloud_3.svg'
import { ReactComponent as WindSvg } from '../../assets/svgs/wind.svg'
import { ReactComponent as PressureSvg } from '../../assets/svgs/pressure.svg'
import { ReactComponent as HumiditySvg } from '../../assets/svgs/humidity.svg'
import { ReactComponent as Cloud4Svg } from '../../assets/svgs/cloud_4.svg'

const WeatherWidget = ({ location, setModalActive, setModalContent, setLocation, modalActive, modalContent }) => {
    const [todayData, settodayData] = useState([]);
    const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useGetCurrentWeatherQuery(location ? location : 'Saransk');
  
    const { data: forecastData, error: forecastError, isLoading: forecastLoading } = useGetForecastQuery(
      weatherData ? { lat: weatherData.coord.lat, lon: weatherData.coord.lon } : null);

    useEffect(() => {
        if (forecastData && forecastData.list) {
          const today = new Date().toISOString().split("T")[0];
          const todayData = forecastData.list.filter(item =>
            item.dt_txt.startsWith(today)
          );
          settodayData(todayData);
        }
      }, [forecastData]);

    if (weatherLoading || forecastLoading) return <div>Загрузка...</div>;
    if (weatherError) return <div>Ошибка получения текущей погоды: {weatherError.message}</div>;
    if (forecastError) return <div>Ошибка получения прогноза погоды: {forecastError.message}</div>;

    const openSettings = () => {
        setModalContent("settings");
        setModalActive(true);
      };

    const openManageLocations = () => {
        setModalContent("manageLocations");
        setModalActive(true);
    };


    const currentTimeUTC = new Date().getTime() / 1000
    const localTime = currentTimeUTC + weatherData.timezone
    const isDayTime = localTime > weatherData.sys.sunrise && localTime < weatherData.sys.sunset
    const cloudSize = weatherData.clouds.all
    

    const weekDaysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weekDaysShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const today = new Date()
    const month = today.getMonth()+1
    // var weekDayLong = weekDaysLong[today.getDay()]
    // var weekDayShort = weekDaysShort[today.getDay()]
    return (
        <div>
        <div>
        <div className='weather-main'>
            <div className='open-btn' onClick={openSettings}></div>
            <div className='add-loc' onClick={openManageLocations}></div>
            <div className='location'>{weatherData.name}</div>
            {isDayTime ? <SunSvg className='sun' /> : <MoonSvg className='moon' />}
            <div className='cloud-container'>
                {cloudSize > 50 && <CloudSvg className='cloud' />}
            </div>
            <div className='today-date'>{weekDaysLong[today.getDay()]} | {monthsShort[today.getMonth()]} {today.getDate()}</div>
            <div className='temperature'>{Math.round(weatherData.main.temp)}°</div> 
            {/* Нужно сделать по температуре, чтобы цифры центровались, а градус нет */}
            <div className='weather'>{weatherData.weather[0].main}</div>
            <div className='low-high'>{Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°</div>
            <div className='feels-like'>Ощущается как {Math.round(weatherData.main.feels_like)}°</div>
            <hr style={{ color: "white", width: "90%" }}></hr>
            <div className="grid-container">
                    <div className="item left-top">
                    <WindSvg className='windSvg' />
                    <div className='block-data'>
                        <p>{Math.round(weatherData.wind.speed)} m/s</p>
                        <p>Wind</p>
                    </div>
                    </div>
                    <div className="item right-top">
                    <RainSvg className='pressureSvg' />
                    <div className='block-data'>
                        <p>{weatherData.clouds.all} %</p>
                        <p>Rain chances</p>
                    </div>
                    </div>
                    <div className="item left-bottom">
                    <PressureSvg className='pressureSvg' />
                    <div className='block-data'>
                        <p>{weatherData.main.pressure} mbar</p>
                        <p>Pressure</p>
                    </div>
                    </div>
                    <div className="item right-bottom">
                    <HumiditySvg className='pressureSvg' />
                    <div className='block-data'>
                        <p>{Math.round(weatherData.main.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                    </div>
                    </div>
        </div>
         <div className='weather-bottom'>
                 <div className='forecast'>
                     <b>{weekDaysLong[today.getDay()]} | {monthsShort[today.getMonth()]} {today.getDate()}</b>
                     <br></br>
                     <div className='forecast-block'>
                     {todayData.map((hour, index) => (
                        <div key={index}>
                        <p>{hour.dt_txt.split(' ')[1]}</p>
                        {/* <p>Temperature: {hour.main.temp}°C</p> */}
                        {/* сделать, чтобы были различные значки в зависимости от того, какой дождь и тд. Вообще, везде добавить иконки */}
                        {/* <p>{hour.weather[0].description}</p> */}
                        <p>{hour.weather[0].description=="broken clouds" ? <Cloud4Svg className='moon' /> : <CloudSvg className='moon' />}</p>
                        <p>{Math.round(hour.main.temp_min)}° / {Math.round(hour.main.temp_max)}°</p>
                        <p>{hour.clouds.all}% rain</p>
                        {/* <p>{hour.pop}% rain</p> */}
                        <br></br>
                        </div>
                    ))}
                    </div>
                 </div>
         </div>
        </div>
        <Modal
                active={modalActive}
                setActive={setModalActive}
                content={modalContent}
                setLocation={setLocation}
            />
        </div>
    )
}

export default WeatherWidget