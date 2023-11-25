import React from 'react';
import '../assets/aboutme.css';

const AboutMe = () => {
  return (
    <div className="aboutme container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h2>About Me</h2>
          <p>
            Hello! My name is [Your Name], and I am passionate about [something you are passionate about]. I have [number] years of experience in [your field], and I enjoy [mention something you enjoy doing related to your field or hobbies].
          </p>
          <p>
            In my free time, I love [mention a hobby or activity], and I am constantly exploring new ways to [mention something related to your interests or goals].
          </p>
        </div>
        <div className="col-md-6">
          {/* You can add an image or any other content about yourself in this column */}
          <img
            src="your-profile-image.jpg"
            alt="Your Profile"
            className="img-fluid rounded-circle"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
