import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import '../assets/counter.css'

const Counter = () => {
  const [countUpVisible, setCountUpVisible] = useState(false);
  const countUpRefs = useRef([]);

  // This useEffect will trigger the counting animation when the component is in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isElementInViewport() && !countUpVisible) {
        setCountUpVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [countUpVisible]);

  // Check if the element is in the viewport
  const isElementInViewport = () => {
    const element = document.querySelector('.countup-container');
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };


  return (
    <div className="p-4 counterbg" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="container">
        <div className="row" style={{ color: '#fff' }}>
          <div className="col-12 col-md-4  countup-container">
            <div className="text-center">
              <CountUp end={countUpVisible ? 7 : 0} duration={2} delay={0.5} ref={(countUp) => countUpRefs.current[0] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="clocknumber display-4 font-weight-bold" onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className="font-weight-bold text-uppercase" style={{ color: 'white' }}>Frameworks</p>
            </div>
          </div>
         
          <div className="col-12 col-md-4  countup-container">
            <div className="text-center">
              <CountUp end={countUpVisible ? 10 : 0} duration={3} delay={0.5} ref={(countUp) => countUpRefs.current[2] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="clocknumber display-4 " onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className=" text-uppercase" style={{ color: 'white' }}>projects</p>
            </div>
          </div>
          <div className="col-12 col-md-4 countup-container ">
            <div className="text-center">
              <CountUp end={countUpVisible ? 5 : 0} duration={2} delay={0.5} ref={(countUp) => countUpRefs.current[3] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="clocknumber display-4 font-weight-bold" onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className="text-uppercase" style={{ color: 'white' }}>Languages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;