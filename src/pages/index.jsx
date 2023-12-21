import React, { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import Navbare from '../components/navbar';
import '../assets/index.css';
import astronautImage from '../assets/images/spaceman.png';
import Wellcome from '../components/wellcome';
import AboutMe from '../components/Aboutme';
import Counter from '../components/counter';
import Contact from './contact';
import Experience from './experience';
import GitHubRepositories from './repos';
import Techs from '../components/techs';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;

    function handleLoad() {
      // Introduce a delay before switching to the high-resolution image
      setTimeout(() => {
        setLoaded(true);
      }, 650); // Adjust the delay time as needed
    }

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
    }

    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className={`spacex ${loaded ? 'high-res-loaded' : ''}`}>
      <Navbare />
      <div>
        <img ref={imgRef} src={astronautImage} alt="Astronaut" className="astronaut" />
        <Wellcome />
      </div>
      <Counter />
      <AboutMe />
      <div>
        <Experience />
      </div>
      <div>
        <GitHubRepositories />
      </div>
      <Techs />
      <Contact />
    </div>
  );
};

export default Index;
