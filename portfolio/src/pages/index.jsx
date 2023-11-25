import React from 'react'
import Navbare from '../components/navbar'
import '../assets/index.css';
import astronautImage from '../assets/images/spaceman.png';
import Wellcome from '../components/wellcome';
import AboutMe from '../components/Aboutme';
import Counter from '../components/counter';

const Index = () => {
  return (
    <div className='spacex'>
      <Navbare/>     
      <div>
      <img src={astronautImage} alt="Astronaut" className="astronaut" /> 
      <Wellcome/>
      </div>
      <Counter/>
      <AboutMe/>
    </div>
  )
}

export default Index