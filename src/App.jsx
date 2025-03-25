import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeProvider, useTheme } from './context/context'; // Import the context
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { useLocation } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function Nav() {
  const { theme, toggleTheme } = useTheme(); // Access the theme context
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle
  const location = useLocation(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };
  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Set CSS variables for the mouse position relative to the div
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    // Apply theme to document body based on the selected theme
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
console.log(theme);
  return (
    <div data-theme={theme} onMouseMove={handleMouseMove} className={`transition-all inset-hover  dark:bg-[#2d2d2d] bg-[#e5e5e5] z-10`}>
      {/* Full-page menu transition */}
      <div className={`fixed top-0 left-0 w-full h-full bg-[#e5e5e5] dark:bg-[#2d2d2d] transform transition-transform duration-300 z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 text-center text-3xl sm:text-5xl font-bold z-50">
          <ul>
            <li><a href="/" className="block py-4 text-gray-900 dark:text-white hover:text-blue-600 my-2 mt-20 sm:mt-10 mx-10 sm:mx-44 hover:bg-skyblue-100 dark:hover:bg-[#2d2d2d]">Home<a className='block neumorphism-inset h-2 w-full mt-5'/></a></li>
            <li><a href="/about" className="block py-4 text-gray-900 dark:text-white hover:text-blue-600 my-2 mx-10 sm:mx-44">About Me<a className='block neumorphism-inset h-2 w-full mt-5'/></a></li>
            <li><a href="/projects" className="block py-4 text-gray-900 dark:text-white hover:text-blue-600 my-2 mx-10 sm:mx-44">Some Projects<a className='block neumorphism-inset h-2 w-full mt-5'/></a></li>
            <li><a href="/contact" className="block py-4 text-gray-900 dark:text-white hover:text-blue-600 my-2 mx-10 sm:mx-44">Contact Me<a className='block neumorphism-inset h-2 w-full mt-5'/></a></li>
          </ul>
        </div>
      </div>
      <div className='dark:bg-[#2d2d2d]  bg-[#e5e5e5]'>
        <div className="fixed top-6 left-6 space-y-4 z-50  sm:flex sm:flex-col sm:space-y-5 sm:space-x-4 dark:bg-[#2d2d2d]  bg-[#e5e5e5]">
        {location.pathname !== "/" && !menuOpen ? ( 
            <img 
                src="./profile.jpg" 
                alt="Profile"
                className="w-20 neumorphism rounded-4xl shadow-lg"
            />
        ) : null}


        </div>
        {/* Floating Icon Buttons */}
        <div className="fixed top-6 right-6 space-y-4 z-50 neumorphism p-2  sm:flex sm:flex-col sm:space-y-5 sm:space-x-4 dark:bg-[#2d2d2d]  bg-[#e5e5e5]">
          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="p-4 mx-2 rounded-full neumorphism bg-white dark:bg-[#363636] shadow-xl hover:shadow-2xl focus:outline-none"
          >
            <FaBars className="text-2xl text-gray-800 dark:text-white" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-4 mx-2 rounded-full neumorphism bg-white dark:bg-[#2a2a2a] shadow-xl hover:shadow-2xl focus:outline-none"
          >
            {theme === 'light' ? (
              <FaMoon className="text-2xl text-gray-800 dark:text-white" />
            ) : (
              <FaSun className="text-2xl text-gray-800 dark:text-white" />
            )}
          </button>
          
        </div>
      </div>

    </div>
  );
}

export default App;
