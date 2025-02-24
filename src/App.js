import './App.css';
import { useEffect, useState } from 'react';
import { FaBars, } from 'react-icons/fa';
import { Mixpanel } from './Mixpanel';
import MainPage from './Components/MainPage';
import A from './Components/A';
import Links from './Components/Links';



function App() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const [theaterScreen, setTheaterScreen] = useState("home");

  const [sidebarVisible, setSidebarVisible] = useState(!isMobile);

  useEffect(() => {
    document.title = "Jeremy Lee";
    Mixpanel.track("User Logged In");
  })
  // check mobile
  const mapping = {
    1: 'white-key',
    2: 'black-key',
    3: 'white-key',
    4: 'black-key',
    5: 'white-key',
    6: 'white-key',
    7: 'black-key',
    8: 'white-key',
    9: 'black-key',
    10: 'white-key',
    11: 'black-key',
    12: 'white-key',
  };

  const getKeyboard = () => {
    var arr = [];
    var counter = 14;

    var list1 = [
      {
        name: "home"
      },
      {},{},{},{}, {
        name: "work"
      }, {}, {}, {}, {}, {}, {}
    ]
    var list2 = [
      {
        name: ""
      },
      {},{},{},{}, {}, {}, {}, {}, {}, {}, {}
    ]

    const iterate = (list) => {
      list.forEach(({
        name
      }, i) => {
        arr.push(
          <div 
            className={mapping[i + 1]} 
            id={counter}
            style={{cursor: {name} && 'pointer'}}
            onClick={() => {
              if(name) {
                Mixpanel.track(name);
                setTheaterScreen(name);
              }

              if(isMobile){
                setSidebarVisible(false);
              }
            }}
          >
            {name}
        </div>);
        counter += 1;
      });
    }

    iterate(list1);
    iterate(list2);

    return arr;
  }


  const getOnTheater = () => {
    const Content = () => {
      if(theaterScreen == "home"){
        return <MainPage mixpanel={Mixpanel} isMobile={isMobile} />
      }
      if(theaterScreen == "links"){
        return <Links mixpanel={Mixpanel} isMobile={isMobile} />
      }
    }
    return (
      
        <Content />
      
    )
    
  }
  
  return (
    <div className="flex-column container">
      {
          isMobile && (
            <div style={{ }}>
              <FaBars onClick={() => setSidebarVisible(!sidebarVisible)} style={{ position: "absolute", top: 10, left: 10, fontSize: 30 }} />
            </div>
          )
      }
      {getOnTheater()}
      {
        sidebarVisible ?
         (
          <div className="piano">
            <div className="piano-top">
              <div className="steinway">
                
              </div>
            </div>
            <div className="keyboard">
              {getKeyboard()}
            </div>
          </div>
         ) : (
          <></>
         )
      }
  </div>
  );
}

export default App;
