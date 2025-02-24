import { FaPlay, FaPause } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useState, useRef, useEffect, useCallback } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  trackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem',
  },
  trackItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0.625rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  trackItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  trackItemInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  trackInfo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
  composer: {
    color: '#666',
  },
  trackDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  subheader: {
    fontSize: '0.75rem',
    color: '#666',
    fontStyle: 'italic',
  },
  mainRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  progressContainer: {
    width: '100%',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
  },
  progressBar: {
    flex: 1,
    height: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    cursor: 'pointer',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#666',
    borderRadius: '2px',
    transition: 'width 0.1s linear',
  },
  progressHandle: {
    width: '12px',
    height: '12px',
    backgroundColor: '#666',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    transition: 'transform 0.1s ease',
    '&:hover': {
      transform: 'translate(-50%, -50%) scale(1.2)',
    },
  },
  timeDisplay: {
    fontSize: '0.75rem',
    color: '#666',
    marginLeft: '0.5rem',
    userSelect: 'none',
  },
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicPlayer = ({ 
  recordings, 
  currentTrack, 
  isPlaying, 
  isSpinning, 
  onTrackSelect,
  onEnded,
  isMobile, 
  mixpanel,
  style 
}) => {
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);
  const progressRef = useRef(null);

  // Reset progress when track changes
  useEffect(() => {
    setPlayed(0);
    setDuration(0);
  }, [currentTrack]);

  const handleProgress = useCallback(({ played }) => {
    console.log("played", played);
    if (!seeking) {
      setPlayed(played);
    }
  }, [seeking]);

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
    handleSeekChange(e);
  };

  const handleSeekChange = (e) => {
    if (!progressRef.current) return;
    
    const bounds = progressRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    setPlayed(percentage);
  };

  const handleSeekMouseUp = (e) => {
    if (!progressRef.current || !playerRef.current) return;
    
    setSeeking(false);
    const bounds = progressRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    
    playerRef.current.seekTo(percentage, 'fraction');
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={styles.heading}>Performances</div>
      
      <ReactPlayer
        ref={playerRef}
        url={currentTrack}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onProgress={handleProgress}
        onDuration={setDuration}
        onEnded={onEnded}
        progressInterval={100}  // Update progress more frequently (default is 1000ms)
        config={{
          file: {
            forceAudio: true
          }
        }}
      />

      <div style={styles.trackList}>
        {recordings.map((recording) => {
          const isCurrentTrack = recording.track === currentTrack;
          const Icon = isCurrentTrack && isPlaying ? FaPause : FaPlay;
          
          return (
            <div 
              key={recording.id}
              style={{
                ...styles.trackItem,
                ...(isCurrentTrack ? styles.trackItemActive : styles.trackItemInactive),
              }}
              onClick={() => {
                mixpanel.track(recording.name);
                onTrackSelect(recording.track);
              }}
            >
              <div style={styles.trackDetails}>
                <div style={styles.mainRow}>
                  <div style={styles.trackInfo}>
                    <Icon style={styles.icon} size={12} />
                    {recording.name}
                  </div>
                  <div style={styles.composer}>{recording.composer}</div>
                </div>
                {(recording.date || recording.location) && (
                  <div style={styles.subheader}>
                    {recording.date && recording.location 
                      ? `Live at ${recording.location} • ${recording.date}`
                      : recording.date || recording.location}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="record-player" style={{ marginTop: 'auto' }}>
        <div className="record">
          <div className="record-center"></div>
          <div 
            className="record-sheen"
            style={{
              animationPlayState: isSpinning ? "running" : "paused",
            }}
          />
        </div>
      </div>

      <div style={styles.progressContainer}>
        <div 
          ref={progressRef}
          style={styles.progressBar}
          onMouseDown={handleSeekMouseDown}
          onMouseMove={seeking ? handleSeekChange : null}
          onMouseUp={handleSeekMouseUp}
          onClick={handleSeekChange}
        >
          <div 
            style={{ 
              ...styles.progressFill,
              width: `${played * 100}%`,
            }} 
          />
          <div 
            style={{ 
              ...styles.progressHandle,
              left: `${played * 100}%`,
            }} 
          />
        </div>
        <div style={styles.timeDisplay}>
          {formatTime(duration * played)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer; 