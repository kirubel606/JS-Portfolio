import { Typewriter } from 'react-simple-typewriter';
import {useTheme } from '../context/context'; // Import the context
import { useLocation } from "react-router-dom";
function Hero() {
    const { theme, toggleTheme } = useTheme(); // Access the theme context
    const location = useLocation(); 
    const handleMouseMove = (e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      // Set CSS variables for the mouse position relative to the div
      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };
  return (
    <div data-theme={theme} onMouseMove={handleMouseMove} className="flex flex-col inset-hover items-center justify-center h-screen text-center bg-[#e5e5e5] dark:bg-[#2d2d2d]">
      {location.pathname === "/" ? ( 
          <img 
              src="./profile.jpg" 
              alt="Profile"
              className="absolute top-1/8 w-60 sm:w-40 rounded-full mb-4 neumorphism"
          />
      ) : null}
    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">Hey, I'm <span className="text-blue-600">[Kirubel Fekadu]</span></h1>
    <h1 className="text-xl font-bold relative p-2 text-gray-900 dark:text-white">
      <Typewriter
        words={['Full-Stack Developer', 'React & Django Enthusiast', 'Tech Explorer', 'Digital Artist and Graphics Designer','UI/UX Designer','Frontend Developer']}
        loop={0}
        cursor
        cursorStyle="💭"
        typeSpeed={50}
        deleteSpeed={30}
        delaySpeed={1000}
      />
    </h1>
      <a href="/about" className="mt-6 px-6 py-3 neumorphism text-gray-900 font-bold text-lg dark:text-white">
        Get to know me more
      </a>
    </div>
  );
}

export default Hero;
