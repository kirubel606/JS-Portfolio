import React, { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { AiFillInstagram, AiFillPhone, AiFillLinkedin, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { notification } from 'antd';
import Amongus from "../assets/images/Amongus.png";
import "../assets/contact.css";


const Contact = () => {
  const form = useRef();

  const showNotification = () => {
    notification.success({
      message: 'Thank you for reaching out.',
      description: 'I will get back to you as soon as possible.',
      placement: 'topLeft',
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_gj0xwph', 'template_h31fz2m', form.current, '_gVDvzjsb1_2UnBt3')
      .then((result) => {
        console.log(result.text);
        showNotification();
        // Optionally, you can reset the form after successful submission
        form.current.reset();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the form data directly using form.current
    form.current[name] = value;
  };


  return (
    <div className="bg-black" id="contact">
      <div className="container containero">
        <div className="row pt-5">
          <div className="text-center col-md-3">
            <img
              src={Amongus}
              className="mt-5 img-fluid"
              alt=""
              style={{ borderRadius: "600px" }}
            />

            <div className=" align-items-center mt-5">
              <a
                href="https://www.instagram.com/kirubel_fekadu"
                target="_blank"
                rel="noopener noreferrer"
                className="  text-white text-decoration-none"
                style={{ paddingLeft: "3%" }}
              >
                <AiFillInstagram className="me-2 icone" />
              </a>
              <a
                href="https://www.linkedin.com/in/kirubel606"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-white  text-decoration-none"
                style={{ paddingLeft: "3%" }}
              >
                <AiFillLinkedin className="me-2 icone" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-white   text-decoration-none"
                style={{ paddingLeft: "3%" }}
              >
                <AiFillFacebook className="me-2 icone" />
              </a>
              <a
                href="https://github.com/kirubel606"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-white   text-decoration-none"
                style={{ paddingLeft: "3%" }}
              >
                <AiFillGithub className="me-2 icone" />
              </a>
            </div>
          </div>

          <div className="col-md-3"></div>

          <div className="col-md-6 text-center">
            <h1 className="text-white mt-2 futurefont">Contact</h1>
            <h4 className="mb-2" style={{ color: "rgba(223, 223, 223, 0.8)" }}>
              How can we work together?
            </h4>
            <p className="" style={{ color: "rgba(223, 223, 223, 0.8)" }}>
              Unlock new possibilities and collaboration by reaching out via
              email – together, let's turn your ideas into impactful projects
              and make great things happen!
            </p>
            <div className="d-flex flex-column">
              <div className=" d-flex align-items-center mb-2">
                <i className="bi bi-geo-alt-fill text-white me-2"></i>
                <ImLocation2 className="me-2 text-white" />
                <p className="text-white mb-0">Ayat/Lemi kura</p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <a
                  href="tel:+251926765396"
                  className="text-white d-flex align-items-center text-decoration-none"
                >
                  <AiFillPhone className="me-2" />
                  <p className="text-white mb-0">+251926765396</p>
                </a>
              </div>

              <hr style={{ backgroundColor: "white" }} />
            </div>
            <div className="mb-3 futurefont">
              <form ref={form} onSubmit={sendEmail}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mb-2 form-control transparent-input"
                  placeholder="Name"
                  aria-describedby="suffixId"
                  required
                />
                <input
                  type="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mb-2 form-control transparent-input"
                  placeholder="Phone"
                  aria-describedby="suffixId"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mb-2 form-control transparent-input"
                  placeholder="abc@mail.com"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control transparent-input"
                  placeholder="Write something"
                  rows="3"
                  required
                ></textarea>
                <button type="submit" className="btn mt-2 btn-outline-light">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
