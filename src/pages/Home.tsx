import { Link } from 'react-router-dom';

import BannerImage from '../components/BannerImage';
import LogoWhite from '../components/LogoWhite';
import Watermark from '../components/Watermark';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="container-left">
          <div className="content">
            <LogoWhite width={50} height={50} />
            <span className="sk">witee</span>
            <h1>Social Platform</h1>
            <p>Connect with everyone.</p>
            <Link to="/login">GET STARTED</Link>
          </div>
        </div>
        <div className="container-right">
          <div className="content">
            <BannerImage />
          </div>
        </div>
      </div>
      <Watermark />
    </div>
  );
};

export default Home;
