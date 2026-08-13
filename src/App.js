import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import './App.css';
import { recordings } from './config/recordings';

const films = [
  {
    id: 'skillsync-work',
    type: 'film',
    category: 'Directed · Skillsync',
    title: 'Showing engineering work the right way',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync-2_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync-2.mp4',
  },
  {
    id: 'overshoot',
    type: 'film',
    category: 'Directed · Overshoot',
    title: 'Powering real-time vision',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/overshoot_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/overshoot.mp4',
  },
  {
    id: 'skillsync-devs',
    type: 'film',
    category: 'Directed · Skillsync',
    title: 'Find elite developers from GitHub',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync.mp4',
  },
];

const musicImages = {
  rameau: 'https://cdn.midjourney.com/9529aae0-cbcf-4d68-9e56-00211cbcf071/0_3.png',
  sarcasm2: 'https://cdn.midjourney.com/fc866df0-9e2d-4f46-bbc7-2067d8f506ac/0_1.png',
  sarcasm3: 'https://cdn.midjourney.com/ab5ab554-59f8-457a-b6c5-7bf72d7dbe62/0_1.png',
};

const research = [
  {
    id: 'vivace',
    type: 'link',
    category: 'Research · HAL Science, 2022',
    title: 'Vivace: real-time feedback on piano performance',
    image: 'https://cdn.midjourney.com/83a23d01-536b-4057-bb11-2888cf0657d9/0_0.png',
    href: 'https://hal.science/hal-03864133v1/document',
  },
  {
    id: 'doppler',
    type: 'link',
    category: 'Research · UC Berkeley, 2022',
    title: 'Doppler: restoring distorted musical recordings',
    image: 'https://cdn.midjourney.com/8bc7dafa-65c1-4f58-964a-bf9540ddccec/0_0.png',
    href: 'https://github.com/jrmylee/doppler',
  },
];

const portfolioItems = [
  ...films,
  ...recordings.map((recording) => ({
    ...recording,
    type: 'music',
    category: 'Piano · ' + recording.composer,
    title: recording.name,
    image: musicImages[recording.id],
  })),
  ...research,
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return minutes + ':' + remainder;
};

function PortfolioCard({ item, onSelect }) {
  const content = (
    <>
      <div className="portfolio-image-wrap">
        <img src={item.image} alt="" className="portfolio-image" />
      </div>
      <div className="portfolio-caption">
        <span>{item.category}</span>
        <strong>{item.title}</strong>
      </div>
    </>
  );

  if (item.type === 'link') {
    return (
      <a className="portfolio-card" href={item.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className="portfolio-card" type="button" onClick={() => onSelect(item)}>
      {content}
    </button>
  );
}

function MiniPiano() {
  return (
    <div className="mini-piano" aria-hidden="true">
      <span className="mini-piano-white" />
      <span className="mini-piano-white" />
      <span className="mini-piano-white" />
      <span className="mini-piano-white" />
      <span className="mini-piano-black mini-piano-black--one" />
      <span className="mini-piano-black mini-piano-black--two" />
    </div>
  );
}

function App() {
  const [activeFilm, setActiveFilm] = useState(null);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const activeTrack = recordings.find((recording) => recording.id === activeTrackId);

  useEffect(() => {
    document.title = 'Jeremy Lee — Founder, director & pianist';
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveFilm(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (!audioRef.current || !activeTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [activeTrack, isPlaying]);

  const selectItem = (item) => {
    if (item.type === 'film') {
      audioRef.current?.pause();
      setIsPlaying(false);
      setActiveFilm(item);
      return;
    }

    if (item.type === 'music') {
      if (activeTrackId === item.id) {
        setIsPlaying((playing) => !playing);
      } else {
        setElapsed(0);
        setDuration(0);
        setActiveTrackId(item.id);
        setIsPlaying(true);
      }
    }
  };

  const seek = (event) => {
    const nextTime = Number(event.target.value);
    if (audioRef.current) audioRef.current.currentTime = nextTime;
    setElapsed(nextTime);
  };

  return (
    <main id="top" className={'site-shell' + (activeTrack ? ' has-player' : '')}>
      <header className="hero">
        <p className="eyebrow">Selected work, 2022—2026</p>
        <h1>JEREMY LEE</h1>
        <p className="tagline">Founder, director, pianist—working across technology and music.</p>
        <a className="skip-to-work" href="#work">View selected work ↓</a>
      </header>

      <section id="work" className="portfolio-section" aria-label="Selected work">
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onSelect={selectItem}
            />
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-copy">
          <p>
            I live in San Francisco and am the co-founder and CEO of{' '}
            <a href="https://rubbrband.com">Rubbrband</a>, a modern content studio. We build AI tools for
            filmmakers and make work for technology companies.
          </p>
          <p>
            Before that, I was an undergraduate researcher at Berkeley, building software that could
            listen to and understand music. That work became Vivace, a web app for real-time feedback
            on piano performance, and Doppler, a project for restoring distorted recordings with VAEs.
          </p>
          <p>
            I also study piano performance at the San Francisco Conservatory of Music. Most days land
            somewhere between software, film, and Rameau.
          </p>
        </div>

        <aside className="about-links" aria-label="Contact and profile links">
          <p className="role">Co-founder &amp; CEO, Rubbrband</p>
          <a href="mailto:jeremy@rubbrband.com">Email</a>
          <a href="https://www.linkedin.com/in/jeremy-l-a90742b8/">LinkedIn</a>
          <a href="https://twitter.com/jrmyjlee">Twitter / X</a>
          <a href="https://rubbrband.com">Rubbrband</a>
        </aside>
      </section>

      <footer className="footer">
        <div className="footer-mark">
          <MiniPiano />
          <span>© {new Date().getFullYear()} Jeremy Lee</span>
        </div>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</a>
      </footer>

      {activeFilm && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveFilm(null)}>
          <div className="film-modal" role="dialog" aria-modal="true" aria-label={activeFilm.title} onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setActiveFilm(null)} aria-label="Close video">Close ×</button>
            <video src={activeFilm.video} controls autoPlay playsInline />
            <p>{activeFilm.category}</p>
            <h2>{activeFilm.title}</h2>
          </div>
        </div>
      )}

      {activeTrack && (
        <div className="audio-player" aria-label="Audio player">
          <audio
            ref={audioRef}
            src={activeTrack.track}
            onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onEnded={() => setIsPlaying(false)}
          />
          <button type="button" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="audio-details">
            <strong>{activeTrack.name}</strong>
            <span>{activeTrack.composer}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(elapsed, duration || 0)}
            onChange={seek}
            aria-label="Track position"
          />
          <span className="audio-time">{formatTime(elapsed)} / {formatTime(duration)}</span>
          <button className="audio-close" type="button" onClick={() => { setIsPlaying(false); setActiveTrackId(null); }} aria-label="Close audio player">×</button>
        </div>
      )}
    </main>
  );
}

export default App;
