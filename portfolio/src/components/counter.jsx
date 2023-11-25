import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const Counter = () => {
  const [countUpVisible, setCountUpVisible] = useState(false);
  const countUpRefs = useRef([]);

  // This useEffect will trigger the counting animation when the component is in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isElementInViewport()) {
        setCountUpVisible(true);
      } else {
        setCountUpVisible(false);
        countUpRefs.current.forEach((countUp) => countUp.reset());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if the element is in the viewport
  const isElementInViewport = () => {
    const element = document.querySelector('.countup-container'); // Add a class to the container div
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

  return (
    <div className="p-4 bg-black" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="container">
        <div className="row" style={{ color: '#fff' }}>
          <div className="col-12 col-md-3 border-end countup-container">
            <div className="text-center">
              <CountUp end={countUpVisible ? 2475 : 0} duration={2} delay={0.5} ref={(countUp) => countUpRefs.current[0] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="display-4 font-weight-bold" onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className="font-weight-bold text-uppercase" style={{ color: 'white' }}>user in this month</p>
            </div>
          </div>
          <div className="col-12 col-md-3 border-end countup-container">
            <div className="text-center">
              <CountUp end={countUpVisible ? 2475 : 0} duration={2} delay={0.5} ref={(countUp) => countUpRefs.current[1] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="display-4 font-weight-bold" onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className="font-weight-bold text-uppercase" style={{ color: 'white' }}>member</p>
            </div>
          </div>
          <div className="col-12 col-md-3 border-end countup-container">
            <div className="text-center">
              <CountUp end={countUpVisible ? 2475 : 0} duration={2} delay={0.5} ref={(countUp) => countUpRefs.current[2] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="display-4 font-weight-bold" onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className="font-weight-bold text-uppercase" style={{ color: 'white' }}>contributor</p>
            </div>
          </div>
          <div className="col-12 col-md-3 countup-container">
            <div className="text-center">
              <CountUp end={countUpVisible ? 2475 : 0} duration={2} delay={0.5} ref={(countUp) => countUpRefs.current[3] = countUp}>
                {({ countUpRef, start }) => (
                  <p ref={countUpRef} className="display-4 font-weight-bold" onMouseEnter={start} style={{ color: 'white' }} />
                )}
              </CountUp>
              <p className="font-weight-bold text-uppercase" style={{ color: 'white' }}>total data user</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;