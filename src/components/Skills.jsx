import { useTheme } from '../context/context'; // Import the context


function Skills() {
  const { theme } = useTheme(); // Access the theme context

    return (
      <div data-theme={theme} className='bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex'>
      <div className="p-8 mx-auto text-center mt-10">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900">Skills</h2>
        <ul className="list-none dark:text-gray-400 text-gray-700 mt-4">
          <li>React</li>
          <li>Django</li>
          <li>JavaScript (ES6+)</li>
          <li>HTML/CSS</li>
          <li>Node.js</li>
          <li>Tailwind CSS</li>
          <li>Git/GitHub</li>
        </ul>
      </div>
      </div>
    );
  }
  
  export default Skills; // ✅ Ensure there is a default export
  