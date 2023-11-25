import React from 'react'
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import { App,message, notification } from 'antd';
import '../assets/navbare.css';

const Navbare = () => {
    const showMessage = () => {
        message.success('Success!');
      };
    
      const showNotification = () => {
        notification.info({
          message: 'Notification topLeft',
          description: 'Hello, Ant Design!!',
          placement: 'topLeft',
        });
      };


  return (
    <div>
     <Navbar expand="lg" className="navbare">
      <Container>
        <Navbar.Brand className='brandlogo' href="#home">Kirubel Fekadu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse className="middleitems" id="basic-navbar-nav">
        
          <Nav className="mx-auto">
           
            <Nav.Link className='navlink' href="#middle-link" onClick={showMessage}> About me </Nav.Link>
            <Nav.Link className='navlink' href="#middle-link"> Experiences </Nav.Link>
            <Nav.Link className='navlink' href="#middle-link"> Blog </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
          <Nav.Link className='navlink' href="/contact">Contact</Nav.Link>
          <Nav.Link className='navlink' href="#link">Link</Nav.Link>
          <NavDropdown className='navlink' title="My Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">D2J</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">ODP</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Data Analytics</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Skills</NavDropdown.Item>
           </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
    </div>
  )
}

export default Navbare