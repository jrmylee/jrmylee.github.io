import { recordings } from '../config/recordings';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import Profile from './Profile';
import MusicPlayer from './MusicPlayer';
import Links from './/Links';

const quadrantStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem',
  marginLeft: '200px',
  marginRight: '2rem',
};

const mobileQuadrantStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  margin: '1rem',
};

const quadrantItemStyles = {
  minHeight: '400px',
  backgroundColor: '#e0eaf5',
};

const cardStyles = {
  height: '100%',
  backgroundColor: '#f1f1f1',
  borderRadius: '3px',
  padding: '20px 20px',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
};

const MainPage = ({ isMobile, mixpanel }) => {
  const { 
    currentTrack, 
    isPlaying, 
    isSpinning, 
    togglePlay,
    setIsPlaying
  } = useAudioPlayer(recordings[0].track);

  const handleTrackEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', padding: '1.25rem' }}>
      <div style={isMobile ? mobileQuadrantStyles : quadrantStyles}>
        <div style={quadrantItemStyles}>
          <Profile 
            isMobile={isMobile} 
            style={cardStyles}
          />
        </div>
        
        <div style={quadrantItemStyles}>
          <MusicPlayer
            recordings={recordings}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            isSpinning={isSpinning}
            onTrackSelect={togglePlay}
            onEnded={handleTrackEnd}
            isMobile={isMobile}
            mixpanel={mixpanel}
            style={cardStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;