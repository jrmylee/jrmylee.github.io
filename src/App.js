import { useEffect, useState } from 'react';
import './App.css';

const films = [
  {
    id: 'novig-nationwide',
    type: 'film',
    category: 'Directed · Novig',
    title: 'Novig Nationwide',
    image: 'https://static.rubbrband.com/portfolio/custom-thumb/770fe5c6-c764-4a0f-adbd-304ac4af8f0e.png',
    video: 'https://static.rubbrband.com/portfolio/display/770fe5c6-c764-4a0f-adbd-304ac4af8f0e.mp4',
  },
  {
    id: 'mutiny',
    type: 'film',
    category: 'Co-directed · Mutiny',
    title: 'Mutiny',
    image: 'https://static.rubbrband.com/portfolio/thumb/c4fa946e-e4d4-4837-ba56-4b3432898633.webp',
    video: 'https://static.rubbrband.com/portfolio/display/c4fa946e-e4d4-4837-ba56-4b3432898633.mp4',
  },
  {
    id: 'novig-points',
    type: 'film',
    category: 'Co-directed · Novig',
    title: 'Novig Points',
    image: 'https://static.rubbrband.com/portfolio/custom-thumb/8af8e1e9-9e45-4e64-a5ef-7ec29981c3d5.png',
    video: 'https://static.rubbrband.com/portfolio/display/8af8e1e9-9e45-4e64-a5ef-7ec29981c3d5.mp4',
  },
  {
    id: 'skillsync-work',
    type: 'film',
    category: 'Directed · Skillsync',
    title: 'Showing engineering work the right way',
    image: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync-2_thumbnail.webp',
    video: 'https://d3lz842dedkh86.cloudfront.net/landing/portfolio_videos/skillsync-2.mp4',
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
  const cardClassName = 'portfolio-card' + (item.presentation ? ` portfolio-card--${item.presentation}` : '');
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
    </div>
  );
}

function App() {
  const [activeFilm, setActiveFilm] = useState(null);

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
            somewhere between software, film, and the piano.
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

    </main>
  );
}

export default App;
