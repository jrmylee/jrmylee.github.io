import { FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import A from './A';
import './MainPage.css';

const MainPage = ({ isMobile, mixpanel }) => (
  <div className="home-container">
    <div className="home-center-panel">
      <h1 className="home-name">Jeremy Lee</h1>

      <div className="home-bio">
        <p>
          CEO at <a href="https://rubbrband.com">Rubbrband</a>, a modern content studio.
        </p>
        <p>
          Previously, researcher at Berkeley, building software that understands music.
          Piano student at <a href="https://sfcm.edu">SFCM</a>.
        </p>
      </div>

      <div className="home-social">
        <A href="mailto:jeremy@rubbrband.com"><FaEnvelope /></A>
        <A href="https://www.linkedin.com/in/jeremy-l-a90742b8/"><FaLinkedin /></A>
        <A href="https://twitter.com/jrmyjlee"><FaTwitter /></A>
      </div>
    </div>
  </div>
);

export default MainPage;
