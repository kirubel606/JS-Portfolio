import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { message, notification } from 'antd';
import '../assets/navbare.css';

const Navbare = () => {
  const [activeSection, setActiveSection] = useState(null);

  const showMessage = () => {
    message.info('Coming Soon...');
  };

  const showNotification = () => {
    notification.info({
      message: 'Notification topLeft',
      description: 'Hello, Ant Design!!',
      placement: 'topLeft',
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNavLinkClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const sections = ['welcome', 'about-me', 'experience', 'contact'];
  
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
  
        // Adjust the buffer to be more forgiving
        const buffer = 50;
  
        if (scrollPosition + buffer >= sectionTop && scrollPosition < sectionBottom + buffer) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };
  

  useEffect(() => {
    const handleScrollEvent = () => handleScroll();
    window.addEventListener('scroll', handleScrollEvent);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="navbare futurefont">
        <Container>
          <Navbar.Brand className='brandlogo' onClick={() => handleNavLinkClick('welcome')}>
            Kirubel Fekadu
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="middleitems" id="basic-navbar-nav">
            <Nav className="mx-auto">
              <div>
              <ScrollLink
                to="about-me"
                spy={true}
                href="#link"
                smooth={true}
                duration={500}
                offset={-20}
                onClick={() => handleNavLinkClick('about-me')}
                className={activeSection === 'about-me' ? 'navlink active' : 'navlink'}
              >
                About me
              </ScrollLink>
              </div>
              <div style={{marginLeft:"20px"}}>
              <ScrollLink
                to="experience"
                spy={true}
                href="#link"
                smooth={true}
                duration={500}
                offset={0}
                onClick={() => handleNavLinkClick('experience')}
                className={activeSection === 'experience' ? 'navlink active' : 'navlink'}
              >
                Experiences
              </ScrollLink>
              </div>
              <div style={{marginLeft:"20px"}}>
              <ScrollLink
                to="contact"
                spy={true}
                href="#link"
                smooth={true}
                duration={500}
                offset={0}
                onClick={() => handleNavLinkClick('contact')}
                className={activeSection === 'contact' ? 'navlink active' : 'navlink '}
              >
                Contact
              </ScrollLink>
              </div>
            </Nav>

            <Nav className="ms-auto">
              <Nav.Link className="navlink" onClick={showMessage}>
                Blog
              </Nav.Link>
              <div  className='p-2'>
              <ScrollLink
                to="projects"
                href="#link"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => handleNavLinkClick('projects')}
                className={activeSection === 'projects' ? 'navlink active' : 'navlink '}
              >
                Projects
              </ScrollLink>
              </div>
          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbare;
