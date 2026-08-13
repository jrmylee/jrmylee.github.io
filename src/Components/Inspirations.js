import './Inspirations.css';

const inspirations = [
  // Row 1 — left to right
  {
    id: 'flw',
    name: 'Frank Lloyd Wright',
    role: 'Architect',
    desc: 'Organic architecture. Space as a living, breathing experience.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Frank_Lloyd_Wright_portrait.jpg',
  },
  {
    id: 'davinci',
    name: 'Leonardo da Vinci',
    role: 'Polymath',
    desc: 'The original synthesis of art and science.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png',
  },
  {
    id: 'jobs',
    name: 'Steve Jobs',
    role: 'Co-founder, Apple',
    desc: 'At the intersection of technology and the liberal arts.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
  },
  {
    id: 'feynman',
    name: 'Richard Feynman',
    role: 'Physicist',
    desc: 'Unbounded curiosity. The pleasure of finding things out.',
    img: 'https://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg',
  },
  {
    id: 'bernstein',
    name: 'Leonard Bernstein',
    role: 'Conductor & Composer',
    desc: 'Music as the highest form of human communication.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Leonard_Bernstein_by_Jack_Mitchell_%28high_quality%29.jpg',
  },

  // Row 2 — sides (title occupies cols 2–4)
  {
    id: 'rachmaninoff',
    name: 'Sergei Rachmaninoff',
    role: 'Composer & Pianist',
    desc: 'Melancholy and grandeur woven into every phrase.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sergei_Rachmaninoff_cph.3a40575.jpg',
  },
  {
    id: 'prokofiev',
    name: 'Sergei Prokofiev',
    role: 'Composer',
    desc: 'Biting wit and lyricism in equal measure.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sergei_Prokofiev_circa_1918_over_Chair_Bain.jpg',
  },

  // Row 3 — sides (title occupies cols 2–4)
  {
    id: 'lynch',
    name: 'David Lynch',
    role: 'Filmmaker',
    desc: 'Surrealism as autobiography. The unconscious made visible.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/David_Lynch_%281990%29.jpg',
  },
  {
    id: 'wes',
    name: 'Wes Anderson',
    role: 'Director',
    desc: 'Perfect symmetry. Every frame a painting.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Wes_Anderson.JPG',
  },

  // Row 4 — left to right
  {
    id: 'trifonov',
    name: 'Daniil Trifonov',
    role: 'Pianist',
    desc: 'Expressive depth—Chopin and Rachmaninoff like grief made audible.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Daniil_Trifonov_at_Carnegie_Hall_2017_%28cropped%29.jpg',
  },
  {
    id: 'gould',
    name: 'Glenn Gould',
    role: 'Pianist',
    desc: 'Bach at its most intellectual and most intimate.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Glenn_Gould_1961_%28cropped%29.jpg',
  },
  {
    id: 'zhao',
    name: 'Ivan Zhao',
    role: 'Founder, Notion',
    desc: 'Building the most beautiful productivity tool ever made.',
    img: 'https://goldhouse.org/wp-content/uploads/2022/05/Ivan-Zhao.png',
  },
  {
    id: 'deakins',
    name: 'Roger Deakins',
    role: 'Cinematographer',
    desc: 'Light as emotional language. 1917. Blade Runner 2049.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/98/RogDeakinsBFI120921_%2816_of_17%29_%2851473086144%29_%28cropped%29.jpg',
  },
  // Row 5 — scattered
  {
    id: 'cella',
    name: 'Carmine Cella',
    role: 'Composer & Researcher, IRCAM',
    desc: 'Where spectral composition meets machine intelligence.',
    img: 'https://music.berkeley.edu/sites/default/files/styles/openberkeley_brand_widgets_rectangle/public/carmine_cella.jpg?itok=0-rjTF62&timestamp=1708469261',
  },
];

const Inspirations = () => (
  <div className="insp-container">
    <div className="insp-grid">
      <div className="insp-title">
        <h1>Inspirations</h1>
        <p className="insp-names">
          Trifonov &middot; Gould &middot; Rachmaninoff &middot; Prokofiev &middot; Bernstein &middot; Cella
          <br />
          Wright &middot; Da Vinci &middot; Lynch &middot; Anderson &middot; Deakins
          <br />
          Jobs &middot; Zhao &middot; Feynman
        </p>
      </div>

      {inspirations.map(p => (
        <div key={p.id} className={`insp-card insp-card--${p.id}`}>
          <img src={p.img} alt={p.name} />
          <div className="insp-overlay">
            <span className="insp-name">{p.name}</span>
            <span className="insp-role">{p.role}</span>
            <span className="insp-desc">{p.desc}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Inspirations;
