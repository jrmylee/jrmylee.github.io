import { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { recordings } from '../config/recordings';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import './Work.css';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const musicImages = {
  rameau:   'https://cdn.midjourney.com/9529aae0-cbcf-4d68-9e56-00211cbcf071/0_3.png',
  sarcasm2: 'https://cdn.midjourney.com/fc866df0-9e2d-4f46-bbc7-2067d8f506ac/0_1.png',
  sarcasm3: 'https://cdn.midjourney.com/ab5ab554-59f8-457a-b6c5-7bf72d7dbe62/0_1.png',
};

const researchImages = {
  vivace:  'https://cdn.midjourney.com/83a23d01-536b-4057-bb11-2888cf0657d9/0_0.png',
  doppler: 'https://cdn.midjourney.com/8bc7dafa-65c1-4f58-964a-bf9540ddccec/0_0.png',
};

const ads = [
  {
    id: 'comm1',
    category: 'Skillsync',
    title: 'showing engineering work the right way',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync-2_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync-2.mp4',
  },
  {
    id: 'comm2',
    category: 'Overshoot',
    title: 'powering real-time vision',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/overshoot_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/overshoot.mp4',
  },
  {
    id: 'comm3',
    category: 'Skillsync',
    title: 'Find elite devs from GitHub',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync.mp4',
  },
];

const research = [
  {
    id: 'vivace',
    title: 'Vivace',
    venue: 'HAL Science · 2022',
    desc: 'Web app for real-time feedback on piano performance.',
    link: 'https://hal.science/hal-03864133v1/document',
  },
  {
    id: 'doppler',
    title: 'Doppler',
    venue: 'UC Berkeley · 2022',
    desc: 'Restoration of distorted musical recordings using VAEs.',
    link: 'https://github.com/jrmylee/doppler',
  },
];

const Work = () => {
  const { currentTrack, isPlaying, togglePlay, setIsPlaying } = useAudioPlayer(null);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [activeAd, setActiveAd] = useState(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setPlayed(0);
    setDuration(0);
  }, [currentTrack]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveAd(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Pause audio when a video modal opens
  useEffect(() => {
    if (activeAd && isPlaying) setIsPlaying(false);
  }, [activeAd]);

  const handleProgress = useCallback(({ played }) => {
    if (!seeking) setPlayed(played);
  }, [seeking]);

  const handleSeekMouseDown = (e) => { setSeeking(true); handleSeekChange(e); };

  const handleSeekChange = (e) => {
    if (!progressRef.current) return;
    const bounds = progressRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - bounds.left) / bounds.width, 0), 1);
    setPlayed(pct);
  };

  const handleSeekMouseUp = (e) => {
    if (!progressRef.current || !playerRef.current) return;
    setSeeking(false);
    const bounds = progressRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - bounds.left) / bounds.width, 0), 1);
    playerRef.current.seekTo(pct, 'fraction');
  };

  const activeRecording = recordings.find(r => r.track === currentTrack);

  return (
    <div className="work-container">
      {currentTrack && (
        <ReactPlayer
          ref={playerRef}
          url={currentTrack}
          playing={isPlaying}
          controls={false}
          width="0"
          height="0"
          onProgress={handleProgress}
          onDuration={setDuration}
          onEnded={() => setIsPlaying(false)}
          progressInterval={100}
          config={{ file: { forceAudio: true } }}
        />
      )}

      {/* ── Video modal ── */}
      {activeAd && (
        <div className="work-modal-overlay" onClick={() => setActiveAd(null)}>
          <div className="work-modal" onClick={e => e.stopPropagation()}>
            <button className="work-modal-close" onClick={() => setActiveAd(null)}>✕</button>
            <video
              ref={videoRef}
              src={activeAd.video}
              controls
              autoPlay
              className="work-modal-video"
            />
            <div className="work-modal-info">
              <span className="work-modal-category">{activeAd.category}</span>
              <span className="work-modal-title">{activeAd.title}</span>
            </div>
          </div>
        </div>
      )}

      <div className="work-grid">

        <div className="work-title">
          <h1>Work</h1>
          <p className="work-sub">Directed &nbsp;&middot;&nbsp; Music &nbsp;&middot;&nbsp; Research</p>

          {currentTrack && (
            <div className="work-transport">
              <div className="work-transport-label">
                {activeRecording?.name}
                {activeRecording?.composer && (
                  <span className="work-transport-composer">&nbsp;&middot;&nbsp;{activeRecording.composer}</span>
                )}
              </div>
              <div className="work-transport-controls">
                <button className="work-play-btn" onClick={() => togglePlay(currentTrack)}>
                  {isPlaying ? <FaPause size={7} /> : <FaPlay size={7} />}
                </button>
                <div
                  className="work-progress-wrap"
                  onMouseDown={handleSeekMouseDown}
                  onMouseMove={seeking ? handleSeekChange : null}
                  onMouseUp={handleSeekMouseUp}
                >
                  <div ref={progressRef} className="work-progress-bar">
                    <div className="work-progress-fill" style={{ width: `${played * 100}%` }} />
                  </div>
                </div>
                <span className="work-time">
                  {formatTime(duration * played)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Commercials — row 1 ── */}
        {ads.map(ad => (
          <div
            key={ad.id}
            className={`work-card work-card--commercial work-card--${ad.id}`}
            onClick={() => setActiveAd(ad)}
          >
            <img src={ad.image} alt={ad.title} className="work-music-img" />
            <div className="work-play-btn-card"><FaPlay size={13} /></div>
            <div className="work-overlay">
              <span className="work-card-tag">{ad.category}</span>
              <span className="work-card-title">{ad.title}</span>
            </div>
          </div>
        ))}

        {/* ── Music — rows 2–3 sides ── */}
        {recordings.map(r => (
          <div
            key={r.id}
            className={`work-card work-card--music work-card--${r.id}${r.track === currentTrack ? ' active' : ''}`}
            onClick={() => togglePlay(r.track)}
          >
            {musicImages[r.id] && (
              <img src={musicImages[r.id]} alt={r.name} className="work-music-img" />
            )}
            <div className="work-overlay">
              <span className="work-card-tag">Music</span>
              <span className="work-card-title">{r.name}</span>
              <span className="work-card-meta">
                {r.composer}{r.location ? ` · ${r.location}` : ''}
              </span>
            </div>
          </div>
        ))}

        {/* ── Research — row 3 right + row 4 center ── */}
        {research.map(r => (
          <a
            key={r.id}
            href={r.link}
            target="_blank"
            rel="noreferrer"
            className={`work-card work-card--research work-card--${r.id}`}
          >
            {researchImages[r.id] && (
              <img src={researchImages[r.id]} alt={r.title} className="work-music-img" />
            )}
            <div className="work-research-label">Research</div>
            <div className="work-research-title">{r.title}</div>
            <div className="work-research-venue">{r.venue}</div>
            <div className="work-overlay">
              <span className="work-card-tag">Research</span>
              <span className="work-card-title">{r.title}</span>
              <span className="work-card-meta">{r.venue}</span>
              <span className="work-card-desc">{r.desc}</span>
            </div>
          </a>
        ))}

      </div>
    </div>
  );
};

export default Work;
