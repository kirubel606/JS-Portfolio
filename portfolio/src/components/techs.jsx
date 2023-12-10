import React from 'react';
import { FaCode, FaJava, FaPhp, FaJsSquare, FaPython, FaReact, FaAngular, FaDatabase, FaTerminal } from 'react-icons/fa';
import { DiMysql, DiMongodb, DiDjango, DiNodejs, DiHtml5 } from 'react-icons/di';
import { SiBootstrap, SiTailwindcss } from 'react-icons/si';
import { BiBrain, BiBarChartAlt2 } from 'react-icons/bi';
import "../assets/quotee.css";
const Techs = () => {
  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: '30px',
    marginBottom: '10px',
  };

  return (
    <div className='bg-black'>
      <div className='container mt-5'>
        <div className='row text-white'>
          <div className='col-md-12 text-center futurefont'>
            <h3 className='text-white'>Inspiring Quotes</h3>
            <img className='quotee' src="https://quotes-github-readme.vercel.app/api?type=horizontal" alt="Quotes" />
          </div>

          {/* Languages */}
          <div className="col-md-4 p-0 mt-5" style={cardContainerStyle}>
            <h3>Languages</h3>
            <div className='row'>
              <FaCode className="col" style={iconStyle} />
              <FaPython className="col" style={iconStyle} />
              <FaJava className='col' style={iconStyle} />
              <FaJsSquare className='col' style={iconStyle} />
              <FaPhp className='col' style={iconStyle} />
            </div>
          </div>

          {/* Frameworks */}
          <div className='col-md-4 p-0 mt-5' style={cardContainerStyle}>
            <h3>Frameworks</h3>
            <div className='row'>
              <FaReact className='col' style={iconStyle} />
              <FaAngular className='col' style={iconStyle} />
              <DiNodejs className='col' style={iconStyle} />
              <DiDjango className='col' style={iconStyle} />
              <DiHtml5 className='col' style={iconStyle} />
              <SiBootstrap className='col' style={iconStyle} /> {/* Bootstrap */}
              <SiTailwindcss className='col' style={iconStyle} /> {/* Tailwind CSS */}
            </div>
            </div>
         

          {/* Softwares */}
          <div className="col-md-4 p-0 mt-5" style={cardContainerStyle}>
            <h3>Data</h3>
            <div className='row'>
              <DiMysql className='col' style={iconStyle} />
              <FaTerminal className='col' style={iconStyle} />
              <DiMongodb className='col' style={iconStyle} />
              <BiBarChartAlt2 className='col' style={iconStyle} /> {/* Power BI */}
              <BiBrain className='col' style={iconStyle} /> {/* NumPy (assuming you have a suitable icon) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Techs;
