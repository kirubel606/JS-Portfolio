import React from 'react';
import Typed from 'react-typed';
import Tilt from 'react-parallax-tilt';
import '../assets/wellcome.css';
import profile from "../assets/images/profile.png";
const Wellcome = () => {
  return (
    <div >
      
    <div className="welcomemsg text-center d-flex align-items-center justify-content-center" id="welcome">
    <div className="col-md-2 mb-4">
           
      </div>
      
      <h1 className="landing display-3 futurefont">Greetings! <br/> Welcome to My Portfolio. </h1>
      <h2 className='landing  futurefont '>I am a...  
      <Typed
        strings={[' Data Scientist 📊 ', ' Frontend Developer ... ',' Database manager... ' ,' UI/UX Designer 💻📱 ',' Digital Artist 🎨 ']}
        typeSpeed={70}
        backSpeed={30}
        loop
      /></h2>
    </div>
    {/* Add other components or content for your home page here */}
  </div>
  );
};

export default Wellcome;
