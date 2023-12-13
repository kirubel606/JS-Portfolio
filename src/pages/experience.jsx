import React from 'react';
import '../assets/xp.css';
import EAII from '../assets/images/AIlogo.avif';
import Guzo from '../assets/images/guzo.png';
import { ColorPicker } from 'antd';

const Experience = () => {
  return (
    <div className="spacex2 page-container" id="experience">
      {/* Div at the top of the page with added height */}
      <div className="top-div"></div>

      <div className="container">
        {/* Updated Title with bigger and white text */}
        <h2 className="text-center mb-2 experience-title futurefont" style={{color:"white"}}>Experience</h2>

        {/* Centered cards with added margin-bottom */}
        <div className='row justify-content-center d-flex flex-wrap'>
          <div className="card bg-dark text-left col-md-4 col-6 mt-4 mb-4">
            <a className="mx-auto"  href="https://www.aii.et/" target="_blank" ><img className="card-img-top mx-auto xpimage" src={EAII} alt="EAII"/></a>
            <div className="card-body">
              <h4 className="xptitle card-title text-white">Ethiopian Artificial Intelligence Institute</h4>
              <p className="xpparagraph card-text text-white"> I am currently working in this institute as a Technical Team lead but I first started out in a Data Engineering role, then later I transitioned into the Software and web development scene.</p>
            </div>
          </div>
    
          
            <div className="card bg-dark text-left col-md-4 col-5 mt-4 m-2 mb-4" >
            <a className="mx-auto" href="https://guzo.tech/" target="_blank">
            <img className="card-img-top xpimage" src={Guzo} alt="Guzo tech" href="" />
            </a>
            <div className="card-body">
              <h4 className="xptitle card-title text-white">Guzo Technologies</h4>
              <p className="xpparagraph card-text text-white">During my internship at this startup, I worked on a web development project and gained some hands-on experience with git collaboration that became useful in my future tasks.</p>
            </div>
           
          </div>
          
        </div>
      </div>

      {/* Div at the bottom of the page with added height */}
      <div className="bottom-div"></div>
    </div>
  );
}

export default Experience;
