import { useEffect, useState } from 'react';
import './App.css';

const films = [
  {
    id: 'rubbrband',
    type: 'film',
    category: 'Director',
    title: 'Rubbrband',
    image: '/posters/rubbrband-hero-loop.gif?v=2',
    video: 'https://static.rubbrband.com/landing/portfolio_videos/rubbrband-full-h264.mp4',
  },
  {
    id: 'novig-nationwide',
    type: 'film',
    category: 'Director',
    title: 'Novig Nationwide',
    image: '/posters/novig-opening-loop.gif?v=2',
    video: 'https://static.rubbrband.com/portfolio/display/770fe5c6-c764-4a0f-adbd-304ac4af8f0e.mp4',
  },
  {
    id: 'mutiny',
    type: 'film',
    category: 'Co-director',
    title: 'Mutiny',
    image: '/posters/mutiny-raccoon-loop.gif?v=2',
    video: 'https://static.rubbrband.com/portfolio/display/c4fa946e-e4d4-4837-ba56-4b3432898633.mp4',
  },
];

const research = [
  {
    id: 'vivace',
    type: 'link',
    category: 'Paper · AIMC, 2022',
    title: 'Vivace: real-time feedback on piano performance',
    image: '/posters/vivace-opening-page.png',
    href: 'https://zenodo.org/record/7088385/files/Lee_2022__Vivace__Web_Application_for_Real-Time_feedback_on_Piano_Performance.pdf',
    presentation: 'paper',
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
  ...research,
];

function PortfolioCard({ item, onSelect }) {
  const presentation = item.presentation || item.type;
  const cardClassName = `portfolio-card portfolio-card--${presentation}`;
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
      <a className={cardClassName} href={item.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={cardClassName} type="button" onClick={() => onSelect(item)}>
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
      <span className="mini-piano-black mini-piano-black--three" />
    </div>
  );
}

function App() {
  const [activeFilm, setActiveFilm] = useState(null);
  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

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

  const selectItem = (item) => {
    if (item.type === 'film') {
      setActiveFilm(item);
    }
  };

  return (
    <main id="top" className="site-shell">
      <header className="hero">
        <h1 className="hero-name" aria-label="Jeremy Lee">
          <span className="hero-name-default" aria-hidden="true">Jeremy Lee</span>
          <span className="hero-name-hover" aria-hidden="true">Joon Kyu Lee</span>
        </h1>
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
          <p>Today is {dayOfWeek}.</p>
          <p>
            I live in San Francisco and am a co-founder and CEO at a creative company called{' '}
            <a href="https://rubbrband.com">Rubbrband</a>. We make commercials for brands like Novig,
            Commure, and other companies you might have heard of (or not).
          </p>
          <p>
            You can reach me at my email <a href="mailto:jeremy@rubbrband.com">here</a>.
          </p>
          <p>I'm not sure what else there is to say. Have a great rest of your {dayOfWeek}...</p>
          <p>Afternoon? Evening? I don't what time it is where you are.</p>
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
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</a>
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

    </main>
  );
}

export default App;
