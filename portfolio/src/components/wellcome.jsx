import React from 'react';
import Typed from 'react-typed';
import '../assets/wellcome.css';

const Wellcome = () => {
  return (
    <div >
    <div className="welcomemsg text-center neontext">
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
