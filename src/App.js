import React, { useState } from 'react';
import WeatherWidget from "./components/weather";
import "./components/weather/fonts/calibri.ttf"

function App() {
  const [location, setLocation] = useState('Saransk');
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState("");
  return (
    <div>
      <WeatherWidget
        location={location} 
        setModalActive={setModalActive} 
        setModalContent={setModalContent}
        setLocation={setLocation}
        modalActive={modalActive}
        modalContent={modalContent}/>
    </div>
  );
}

export default App;