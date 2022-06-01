import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import $ from 'jquery';
import { Midi } from '@tonejs/midi'
import MidiPlayer from 'midi-player-js';
import axios from 'axios';
import midFile from './assets/fantasie.mid';
import fantasieFile from './assets/May11.wav';
import ReactPlayer from 'react-player'
import { FaGithub, FaTwitter, FaLinkedin, } from 'react-icons/fa';
import {RiMovie2Line} from 'react-icons/ri';

function App() {
  const [theaterScreen, setTheaterScreen] = useState("jeremy");
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    document.title = "Jeremy Lee";
  })
  const loadMidi = async url => {
    const { data } = await axios.get(url, {
      responseType: "arraybuffer"
    });
    return data;
  };
  const onPlay = async () => {
    var midiPlayer = new MidiPlayer.Player(function(event) {
      if(event.name === "Note on"){
        $(`#${event.noteNumber}`).addClass('active');
      }else if(event.name === "Note off"){
        $(`#${event.noteNumber}`).removeClass('active');
      }
    });
    const midi = await loadMidi(midFile);
    midiPlayer.loadArrayBuffer(midi);
    midiPlayer.play();  
  }
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
    var counter = 24;
    for(let j = 0; j < 7; j++ ){
      [1,2,3,4,5,6,7,8,9,10,11,12].forEach((i) => {
        arr.push(<div className={mapping[i]} id={counter}></div>);
        counter += 1;
      })
    }
    return arr;
  }

  const getOnTheater = () => {
    if(theaterScreen == "jeremy"){
      return <img className="image" src={require("./assets/photo.png")} width={700} height={450}/>;
    }else if(theaterScreen == "set-list"){
      return <div className="set-list-paper">
        <div style={{cursor: 'pointer', fontSize: 12, marginBottom: 10}} onClick={() => setTheaterScreen("jeremy")}>Back</div>
        <div style={{marginBottom: 10, fontWeight: 700}}>Set List</div>
        <div className="set-list-item" onClick={() => clickTrack("fantasie")}>&#9658; Fantasie Impromptu - Chopin</div>
      </div>
    }else if(theaterScreen == "movie"){
      return <div>
        <img className="image" src={require("./assets/umbrellas.jpeg")} width={700} height={450}>
        </img>
        <div>Now Playing: umbrellas of cherbourg</div>
      </div>
    }else if(theaterScreen == "bio"){
      return <div className="set-list-paper">
        <div style={{cursor: 'pointer', fontSize: 12, marginBottom: 10}} onClick={() => setTheaterScreen("jeremy")}>Back</div>
        <div style={{marginBottom: 10, fontWeight: 700}}>About Me</div>
        <div className="set-list-item">
          Hi there. I'm Jeremy. I live in Berkeley, CA, and like to spend my time drinking coffee, 
          writing cool software, and playing the piano. These days I've been liking the Whole Foods 
          store brand of coffee, called Pleasant Morning Buzz. Anyhow, I'll be using this site to
          share what I've been learning about music, films, and engineering, and especially everything
          in between. Also, I'm sorry if you're reading this on mobile. I'll fix it at some point.
        </div>

        <div style={{marginTop: 20}}>Jeremy Lee</div>
      </div>
    }
  }
  const clickTrack = (name) => {
    if(name == "fantasie"){
      setTimeout(() => {
        onPlay();
      }, 4000)
      setPlaying(true);
    }
  }
  return (
    <div className="flex-column container">
      {getOnTheater()}
      
      <div className="header-name">
        <b>Jeremy Lee</b>
      </div>
      <div style={{marginTop: 10}}>
        <a href='https://github.com/jrmylee'>
          <FaGithub style={{marginRight: 10}}/>
        </a>
        <a href='https://www.linkedin.com/in/jeremy-l-a90742b8/'>
          <FaLinkedin style={{marginRight: 10}}/>
        </a>
        <a href='https://twitter.com/jrmylee_'> 
          <FaTwitter style={{marginRight: 10}}/>
        </a>
      </div>
      <br />
      <ReactPlayer
        url={fantasieFile}
        playing={playing}
        controls={false}
      />

      <div className="piano">
        <div className="piano-top">
          <div className="set-list" onClick={() => setTheaterScreen("set-list")}>
            <p className="set-list-title">Set list</p>
          </div>
          <div className="coffee" onClick={() => setTheaterScreen("movie")}>
          </div>
          <div className="about-me" onClick={() => setTheaterScreen("bio")}>
            <p className="set-list-title">about me</p>
          </div>

          <div className="steinway">
            Steinway &amp; Sons
          </div>
        </div>
        <div className="keyboard">
          {getKeyboard()}
        </div>
      </div>
  </div>
  );
}

export default App;
