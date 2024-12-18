import { useState } from 'react';
import WeatherWidget from "./components/weather";
import "./components/weather/fonts/calibri.ttf"

function App() {
  const [location, setLocation] = useState<string>('Saransk');
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
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