import React, { useState } from 'react';
import '../assets/aboutme.css';
import profile from "../assets/images/profile.png";

const AboutMe = () => {

  return (
    <div className="aboutme bg-black">
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-2 mb-4 " style={{ marginTop: "100px" }}>
            <img
              src={profile}
              alt="Your Profile"
              className="prpic img-fluid mx-auto rounded-circle"
            />
          </div>
        </div>

        <div className="row">
          <div className=" abouthim text-white col-md-6">
            <h2 >About Me</h2>
            <p>
              Hello! I'm Kirubel Fekadu, a computer science graduate from Ethiopia. I'm a versatile professional with a passion for development, data science, and digital art. With a diverse skill set and proficiency in various technologies and programming languages, I bring immediate value to businesses looking to turn their ideas into reality.
            </p>
          </div>
          <div className="col-md-6">
          <div class="accordion" id="accordionExample">

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Development
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <p class="mb-0">
                      As a professional in <strong>Development</strong>, I specialize in creating web and application solutions using a variety of technologies and frameworks. My expertise includes:
                    </p>
                    <ul class="mb-0">
                      <li>Web development with HTML, CSS, and JavaScript</li>
                      <li>Application development using various frameworks, including <strong>React</strong></li>
                      <li>Responsive and user-friendly design implementation</li>
                      <li>Proficient in utilizing the power of <strong>Bootstrap</strong> for efficient and aesthetically pleasing UI/UX</li>
                    </ul>
                  </div>
                </div>
              </div>




            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Data Science
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <p class="mb-0">
                      As a professional in the field of <strong>Data Science</strong>, I specialize in utilizing advanced analytics and machine learning techniques. My skills include:
                    </p>
                    <ul class="mb-0">
                      <li>Data analysis and interpretation</li>
                      <li>Implementing machine learning algorithms</li>
                      <li>Cleaning and preprocessing data</li>
                    </ul>
                    <p class="mt-2">
                      I am passionate about extracting valuable insights from data to drive informed decision-making and solve complex problems.
                    </p>
                  </div>
                </div>
              </div>





            <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Database Management
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p class="mb-0">
                  As a <strong>Database Management</strong> professional, I am experienced in handling both structured and unstructured databases. My expertise includes managing databases using technologies such as:
                </p>
                <ul class="mb-0">
                  <li><code class="ms-1">MySQL</code></li>
                  <li><code class="ms-1">PostgreSQL</code></li>
                  <li><code class="ms-1">MongoDB</code></li>
                </ul>
                <p class="mt-2">
                  I bring a wealth of knowledge in designing and optimizing databases to ensure efficient data storage and retrieval.
                </p>
              </div>
            </div>
          </div>

          </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default AboutMe;
