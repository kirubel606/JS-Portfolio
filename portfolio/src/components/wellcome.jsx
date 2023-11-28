import React from 'react';
import Typed from 'react-typed';
import '../assets/wellcome.css';
import profile from "../assets/images/profile.png";
const Wellcome = () => {
  return (
    <div >
    <div className="welcomemsg text-center neontext d-flex align-items-center justify-content-center">
    <div className="col-md-2 mb-4">
            <img
              src={profile}
              alt="Your Profile"
              className="prpic img-fluid mx-auto rounded-circle"
            />
          </div>
      <h1 className="landing display-3">Welcome to My Portfolio</h1>
      <h2 className='landing neontext'>I am a...  
      <Typed
        strings={[' Data Scientist ', ' Frontend Developer ',' Database manager ' ,' UI/UX Designer ',' Digital Artist ']}
        typeSpeed={50}
        backSpeed={30}
        loop
      /></h2>
    </div>
    {/* Add other components or content for your home page here */}
  </div>
  );
};

export default Wellcome;
