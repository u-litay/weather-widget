import React, { useEffect, useState } from 'react'
import { useGetCurrentWeatherQuery, useGetForecastQuery } from './weatherApi';
import './index.css'
import Modal from "./Modal"


import { ReactComponent as MoonSvg } from '../../assets/svgs/moon_2.svg';
import { ReactComponent as SunSvg } from '../../assets/svgs/sun_2.svg';
import { ReactComponent as CloudSvg } from '../../assets/svgs/cloud_2.svg';
import { ReactComponent as RainSvg } from '../../assets/svgs/cloud_3.svg';
import { ReactComponent as WindSvg } from '../../assets/svgs/wind.svg';
import { ReactComponent as PressureSvg } from '../../assets/svgs/pressure.svg';
import { ReactComponent as HumiditySvg } from '../../assets/svgs/humidity.svg';
import { ReactComponent as Cloud4Svg } from '../../assets/svgs/cloud_4.svg';

interface WeatherWidgetProps {
    location: string;
    setModalActive: (active: boolean) => void;
    setModalContent: (content: string) => void;
    setLocation: (location: string) => void;
    modalActive: boolean;
    modalContent: string;
}

interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    snow?: {
        '3h': number;
    };
    sys: {
        pod: string;
    };
    dt_txt: string;
}


const WeatherWidget: React.FC<WeatherWidgetProps> = ({
    location,
    setModalActive,
    setModalContent,
    setLocation,
    modalActive,
    modalContent
}) => {
    const query: string = location || 'Saransk';
    const [todayData, settodayData] = useState<ForecastItem[]>([]);
    const {
        data: weatherData,
        error: weatherError,
        isLoading: weatherLoading,
    } = useGetCurrentWeatherQuery(query);

    const {
        data: forecastData,
        error: forecastError,
        isLoading: forecastLoading,
    } = useGetForecastQuery(weatherData ? { lat: weatherData.coord.lat, lon: weatherData.coord.lon } : { lat: 0, lon: 0 });

    useEffect(() => {
        if (forecastData && forecastData.list) {
            const today = new Date().toISOString().split("T")[0];
            const todayData = forecastData.list.filter((item: ForecastItem) =>
                item.dt_txt.startsWith(today)
            );
            settodayData(todayData);
        }
    }, [forecastData]);

    if (weatherLoading || forecastLoading) return <div>Загрузка...</div>;
    if (weatherError || forecastError) return <div>Ошибка загрузки данных.</div>;

    const openSettings = () => {
        setModalContent("settings");
        setModalActive(true);
    };

    const openManageLocations = () => {
        setModalContent("manageLocations");
        setModalActive(true);
    };


    const currentTimeUTC = new Date().getTime() / 1000
    const localTime = currentTimeUTC + (weatherData?.timezone || 0)
    const isDayTime = (localTime > (weatherData?.sys?.sunrise || 0)) && (localTime < (weatherData?.sys?.sunset || 0))
    const cloudSize = weatherData?.clouds?.all ?? 0


    const weekDaysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // const weekDaysShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const today = new Date()
    // const month = today.getMonth()+1

    const loca = weatherData?.name ?? 'Saransk'
    const tempa = weatherData?.main.temp ?? 0
    const weatha = weatherData?.weather[0].main ?? 0
    const tempamin = weatherData?.main.temp_min ?? 0
    const tempamax = weatherData?.main.temp_max ?? 0
    const feelslika = weatherData?.main.feels_like ?? 0
    const winda = weatherData?.wind.speed ?? 0
    const clouda = weatherData?.clouds.all ?? 0
    const pressura = weatherData?.main.pressure ?? 0
    const humidita = weatherData?.main.humidity ?? 0

    return (
        <div>
            <div>
                <div className='weather-main'>
                    <div className='open-btn' onClick={openSettings}></div>
                    <div className='add-loc' onClick={openManageLocations}></div>
                    <div className='location'>{loca}</div>
                    {isDayTime ? <SunSvg className='sun' /> : <MoonSvg className='moon' />}
                    <div className='cloud-container'>
                        {cloudSize > 50 && <CloudSvg className='cloud' />}
                    </div>
                    <div className='today-date'>{weekDaysLong[today.getDay()]} | {monthsShort[today.getMonth()]} {today.getDate()}</div>
                    <div className='temperature'>{Math.round(tempa)}°</div>
                    <div className='weather'>{weatha}</div>
                    <div className='low-high'>{Math.round(tempamin)}° / {Math.round(tempamax)}°</div>
                    <div className='feels-like'>Ощущается как {Math.round(feelslika)}°</div>
                    <hr style={{ color: "white", width: "90%" }}></hr>
                    <div className="grid-container">
                        <div className="item left-top">
                            <WindSvg className='windSvg' />
                            <div className='block-data'>
                                <p>{Math.round(winda)} m/s</p>
                                <p>Wind</p>
                            </div>
                        </div>
                        <div className="item right-top">
                            <RainSvg className='pressureSvg' />
                            <div className='block-data'>
                                <p>{clouda} %</p>
                                <p>Rain chances</p>
                            </div>
                        </div>
                        <div className="item left-bottom">
                            <PressureSvg className='pressureSvg' />
                            <div className='block-data'>
                                <p>{pressura} mbar</p>
                                <p>Pressure</p>
                            </div>
                        </div>
                        <div className="item right-bottom">
                            <HumiditySvg className='pressureSvg' />
                            <div className='block-data'>
                                <p>{Math.round(humidita)}%</p>
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
                                    <p>{hour.weather[0].description == "broken clouds" ? <Cloud4Svg className='moon' /> : <CloudSvg className='moon' />}</p>
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
                content={modalContent === 'settings' || modalContent === 'manageLocations' ? modalContent : 'settings'}
                setLocation={setLocation}
            />
        </div>
    )
}

export default WeatherWidget