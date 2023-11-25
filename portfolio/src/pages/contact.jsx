import React from 'react';
import Navbare from '../components/navbar';
import Amongus from '../assets/images/Amongus.png';
import 'react-icons';

const Contact = () => {
  return (
    <div className='bg-black' style={{height:"100vh"}}>
      <Navbare />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img src={Amongus} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="" style={{ borderRadius: "600px" }} />
          </div>

          <div className="col-md-3">
          </div>

          <div className="col-md-6">
            <h1 className='text-white mt-5 mb-5'>I am located at..</h1>
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt-fill text-primary me-2"></i>
              <p className="text-white">Ayat/Lemi kura</p>
              <p className="text-white">Phone:</p>
              <p className="text-white">Phone:</p>
              <hr style={{backgroundColor:"white"}}></hr >
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">Email</label>
              <input type="email" className="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" />
              
              <label htmlFor="" className="form-label"></label>
              <textarea className="form-control" name="" id="" rows="3"></textarea>
              <button type="submit" className="btn mt-2 btn-primary">Submit</button>
            </div>
          </div>

          <div className='text-white mb-5 col-md-3'>
            <h1>new line</h1>
          </div>
          
           
        </div>
      </div>
    </div>
  );
}

export default Contact;
