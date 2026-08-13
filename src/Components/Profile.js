import { FaEnvelope, FaTwitter, FaLinkedin } from 'react-icons/fa';
import A from './A';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '150px',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8px',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginRight: '1rem',
  },
  icon: {
    marginRight: '0.75rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  content: {
    fontSize: '0.875rem',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  list: {
    marginTop: '1rem',
    listStyle: 'disc',
    paddingLeft: '1.2rem'
  },
  listItem: {
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  listItemText: {
    display: 'inline',
  }
};

const Profile = ({ isMobile, style }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <img 
        style={styles.image}
        src={require("../assets/head.png")} 
        alt="Profile"
      />
      <div style={styles.socialContainer}>
        <h1 style={styles.name}>Jeremy Lee</h1>
        <A href='mailto:jeremy@rubbrband.com'>
          <FaEnvelope style={styles.icon} />
        </A>
        <A href='https://www.linkedin.com/in/jeremy-l-a90742b8/'>
          <FaLinkedin style={styles.icon} />
        </A>
        <A href='https://twitter.com/jrmyjlee'> 
          <FaTwitter style={styles.icon} />
        </A>
      </div>

      <div style={styles.content}>
        <p>I live in San Francisco and am a co-founder of <a style={styles.link} href="https://rubbrband.com">Rubbrband</a>.</p>
        <p style={{ marginTop: '1rem' }}>Previously, I was a undergrad researcher at Berkeley, building software that can listen to and understand music.</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <span style={styles.listItemText}>
              <a style={styles.link} href="https://hal.science/hal-03864133v1/document">Vivace</a>: Web Application for Real-Time feedback on Piano Performance (<a style={styles.link} href="https://github.com/jrmylee/vivace">GitHub</a>)
            </span>
          </li>
          <li style={styles.listItem}>
            <span style={styles.listItemText}>
              <a style={styles.link} href="https://github.com/jrmylee/doppler">Doppler</a>: Restoration of distorted musical recordings using VAEs (<a style={styles.link} href="https://github.com/jrmylee/doppler">GitHub</a>)
            </span>
          </li>
        </ul>
        <p style={{ marginTop: '1rem' }}>My main interests are:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <span style={styles.listItemText}>
              <b>Software for creativity</b> - At <a style={styles.link} href="https://rubbrband.com">Rubbrband</a>, we're building AI tools for filmmakers.
            </span>
          </li>
          <li style={styles.listItem}>
            <span style={styles.listItemText}>
              <b>Classical Music</b> - I study piano performance at <a style={styles.link} href="https://sfcm.edu">SFCM</a>.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile; 