import React from 'react';
import Navbare from '../components/navbar';
import Amongus from '../assets/images/Amongus.png';
import "../assets/contact.css";
import { AiFillInstagram, AiFillPhone, AiFillLinkedin, AiFillFacebook, AiFillGithub } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

const Contact = () => {
  return (
    <div className='bg-black'>
      <div className="container containero">
        <div className="row">
          <div className="text-center col-md-3">
            <img src={Amongus} className="mt-5 img-fluid" alt="" style={{ borderRadius: "600px" }} />
            
            <div className=" align-items-center mt-5">
                <a href="https://www.instagram.com/kirubel_fekadu" target="_blank" rel="noopener noreferrer" className="  text-white text-decoration-none"  style={{paddingLeft:"3%"}}>
                  <AiFillInstagram className="me-2 icone" />
                </a>
                <a href="https://www.linkedin.com/in/kirubel606" target="_blank" rel="noopener noreferrer" className=" text-white  text-decoration-none"  style={{paddingLeft:"3%"}}>
                  <AiFillLinkedin className="me-2 icone" />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className=" text-white   text-decoration-none" style={{paddingLeft:"3%"}}>
                  <AiFillFacebook className="me-2 icone"/>
                </a>
                <a href="https://github.com/kirubel606" target="_blank" rel="noopener noreferrer" className=" text-white   text-decoration-none" style={{paddingLeft:"3%"}}>
                  <AiFillGithub className="me-2 icone"/>
                </a>
              </div>
          </div>

          <div className="col-md-3"></div>

          <div className="col-md-6 text-center">
            <h1 className='text-white mt-2'>Contact</h1>
            <h4 className='mb-2' style={{ color: "rgba(223, 223, 223, 0.8)" }}>How can we work together?</h4>
            <p className='' style={{ color: "rgba(223, 223, 223, 0.8)" }}>Unlock new possibilities and collaboration by reaching out via email – together, let's turn your ideas into impactful projects and make great things happen!</p>
            <div className="d-flex flex-column">
              <div className=" d-flex align-items-center mb-2">
                <i className="bi bi-geo-alt-fill text-white me-2"></i>
                <ImLocation2 className='me-2 text-white'/>
                <p className="text-white mb-0">Ayat/Lemi kura</p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <a href="tel:+251926765396" className="text-white d-flex align-items-center text-decoration-none">
                  <AiFillPhone className="me-2" />
                  <p className="text-white mb-0">+251926765396</p>
                </a>
              </div>
              
              <hr style={{ backgroundColor: "white" }} />
            </div>
            <div className="mb-3">
            
              <input type="text" name="name" id="name" className="mb-2 form-control" placeholder="Name" aria-describedby="suffixId"/>
              <input type="phone" name="phonee" id="phone" className="mb-2 form-control" placeholder="Phone" aria-describedby="suffixId"/>
              <input type="email" className="mb-2 form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" />
              <textarea className="form-control" placeholder="Write something" name="" id="" rows="3"></textarea>
              <button type="submit" className="btn mt-2 btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
