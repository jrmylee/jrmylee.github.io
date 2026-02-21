import './App.css';
import { useEffect, useState } from 'react';
import { Mixpanel } from './Mixpanel';
import MainPage from './Components/MainPage';
import Links from './Components/Links';
import Inspirations from './Components/Inspirations';
import Work from './Components/Work';



function App() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const [theaterScreen, setTheaterScreen] = useState("home");

  useEffect(() => {
    document.title = "Jeremy Lee";
    Mixpanel.track("User Logged In");
  });

  const keys = [
    // Octave 1
    { type: 'white-key' },                                                             // C1
    { type: 'black-key' },                                                             // C#1
    { type: 'white-key' },                                                             // D1
    { type: 'black-key' },                                                             // D#1
    { type: 'white-key' },                                                             // E1
    { type: 'white-key' },                                                             // F1
    { type: 'black-key' },                                                             // F#1
    { type: 'white-key', nav: 'home', label: 'H', tooltip: 'Home' },                 // G1
    { type: 'black-key' },                                                             // G#1
    { type: 'white-key' },                                                             // A1
    { type: 'black-key' },                                                             // A#1
    { type: 'white-key' },                                                             // B1
    // Octave 2
    { type: 'white-key' },                                                             // C2
    { type: 'black-key' },                                                             // C#2
    { type: 'white-key' },                                                             // D2
    { type: 'black-key' },                                                             // D#2
    { type: 'white-key' },                                                             // E2
    { type: 'white-key', nav: 'work', label: 'W', tooltip: 'Work' },                 // F2
    { type: 'black-key' },                                                             // F#2
    { type: 'white-key' },                                                             // G2
    { type: 'black-key' },                                                             // G#2
    { type: 'white-key' },                                                             // A2
    { type: 'black-key' },                                                             // A#2
    { type: 'white-key' },                                                             // B2
    // Octave 3
    { type: 'white-key' },                                                             // C3
    { type: 'black-key' },                                                             // C#3
    { type: 'white-key' },                                                             // D3
    { type: 'black-key' },                                                             // D#3
    { type: 'white-key', nav: 'inspirations', label: 'I', tooltip: 'Inspirations' }, // E3
    { type: 'white-key' },                                                             // F3
    { type: 'black-key' },                                                             // F#3
    { type: 'white-key' },                                                             // G3
    { type: 'black-key' },                                                             // G#3
    { type: 'white-key' },                                                             // A3
    { type: 'black-key' },                                                             // A#3
    { type: 'white-key' },                                                             // B3
  ];

  const navigate = (screen) => {
    Mixpanel.track(screen);
    setTheaterScreen(screen);
  };

  const renderContent = () => {
    if (theaterScreen === 'home') return <MainPage mixpanel={Mixpanel} isMobile={isMobile} />;
    if (theaterScreen === 'links') return <Links mixpanel={Mixpanel} isMobile={isMobile} />;
    if (theaterScreen === 'work') return <Work />;
    if (theaterScreen === 'inspirations') return <Inspirations />;
    return null;
  };

  return (
    <div className="app-container">
      <div className="content-area">
        {renderContent()}
      </div>
      <div className="piano">
        <div className="keyboard">
          {keys.map((key, i) => (
            <div
              key={i}
              className={`${key.type}${key.nav ? ' nav-key' : ''}`}
              onClick={() => key.nav && navigate(key.nav)}
              data-tooltip={key.tooltip}
            >
              {key.label && <span className="key-label">{key.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
