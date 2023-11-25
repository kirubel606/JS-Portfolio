import React, { useState } from 'react';
import '../assets/aboutme.css';
import profile from "../assets/images/profile.png";
const AboutMe = () => {

  const [showDevelopment, setShowDevelopment] = useState(false);
  const [showDataScience, setShowDataScience] = useState(false);
  const [showDatabaseManagement, setShowDatabaseManagement] = useState(false);

  return (
    <div className="aboutme bg-black">
      <div className="container">
      <div className="row" >
        <div className="col-md-2" style={{marginTop:"100px"}}>
            {/* You can add an image or any other content about yourself in this column */}
            <img
              src={profile}
              alt="Your Profile"
              className="img-fluid rounded-circle"
            />
          </div>
        </div>

        <div className="row">
          <div className="text-white col-md-6">
            <h2>About Me</h2>
            <p>
            Hello! I'm Kirubel Fekadu, a computer science graduate from Ethiopia. I'm a versatile professional with a passion for development, data science, and digital art. With a diverse skill set and proficiency in various technologies and programming languages, I bring immediate value to businesses looking to turn their ideas into reality.            
            </p>
            
          </div>
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="droptogle dropdown-toggle"
                type="button"
                id="dropdownDevelopment"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setShowDevelopment(!showDevelopment)}
              >
                Development
              </button>
              <div className={`dropdown-items dropdown-menu ${showDevelopment ? 'show' : ''}`} aria-labelledby="dropdownDevelopment">
                <p className="dropdown-items">
                  Experienced in web and application development using various technologies and frameworks.
                </p>
              </div>
            </div>

            <div className="dropdown">
              <button
                className="droptogle dropdown-toggle"
                type="button"
                id="dropdownDataScience"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setShowDataScience(!showDataScience)}
              >
                Data Science
              </button>
              <div className={`dropdown-items dropdown-menu ${showDataScience ? 'show' : ''}`} aria-labelledby="dropdownDataScience">
                <p className="dropdown-items">
                  Proficient in data analysis and cleaning, utilizing data science tools and methodologies.
                </p>
              </div>
            </div>

            <div className="dropdown">
              <button
                className="droptogle dropdown-toggle"
                type="button"
                id="dropdownDatabaseManagement"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setShowDatabaseManagement(!showDatabaseManagement)}
              >
                Database Management
              </button>
              <div
                className={`dropdown-items dropdown-menu ${showDatabaseManagement ? 'show' : ''}`}
                aria-labelledby="dropdownDatabaseManagement"
              >
                <p className="dropdown-items">Skilled in managing databases using MySQL, PostgreSQL, and MongoDB.</p>
              </div>
            </div>


          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default AboutMe;
