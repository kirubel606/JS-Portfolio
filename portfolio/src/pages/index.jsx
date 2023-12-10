import React from 'react';
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
  return (
    <div className='spacex'>
      <Navbare />
      <div>
        
          <img src={astronautImage} alt="Astronaut" className="astronaut" />
        
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
