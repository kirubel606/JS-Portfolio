import { useTheme } from '../context/context'; // Import the context

function About() {
    const { theme } = useTheme(); // Access the theme context
    const handleMouseMove = (e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      // Set CSS variables for the mouse position relative to the div
      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };


    return (
    <div data-theme={theme} onMouseMove={handleMouseMove} className='bg-[#e5e5e5] inset-hover dark:bg-[#2d2d2d] w-full min-h-screen flex justify-center items-center'>
      <div className="p-10 max-w-5xl text-center mt-20 rounded-lg">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
          I'm a passionate Full-Stack Developer with expertise in React, Django, and modern web technologies. I love building creative and interactive web applications that provide excellent user experiences.
        </p>
        
        {/* Add a Section with Skills */}
        <div className="mt-10 neumorphism-inset p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h3>
          <p className="text-gray-700 dark:text-gray-400 mt-4">
            I have experience working with various technologies such as:
          </p>
          <ul className="mt-4 list-disc text-left text-gray-700 dark:text-gray-400 max-w-xl mx-auto">
            <li>React.js, Next.js, and Redux</li>
            <li>Python and Django for backend development</li>
            <li>REST APIs and GraphQL</li>
            <li>Responsive web design with Tailwind CSS</li>
            <li>Version control with Git and GitHub</li>
          </ul>
        </div>

        {/* Add a Section with Experience */}
        <div className="mt-10 neumorphism-inset p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Experience</h3>
          <p className="text-gray-700 dark:text-gray-400 mt-4">
            I have worked on several projects where I applied my knowledge of full-stack development, building applications from the ground up. Here are some examples:
          </p>
          <ul className="mt-4 list-disc text-left text-gray-700 dark:text-gray-400 max-w-xl mx-auto">
            <li>Built an eCommerce web app with React, Redux, and Django</li>
            <li>Developed a real-time messaging app using WebSockets</li>
            <li>Worked on performance optimizations for large-scale web applications</li>
          </ul>
        </div>

        {/* Add a Section with Contact */}
        <div className="mt-10 neumorphism-inset p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Me</h3>
          <p className="text-gray-700 dark:text-gray-400 mt-4">
            I'm always open to exciting opportunities and collaborations. Feel free to reach out to me!
          </p>
          <div className="mt-4">
            <a href="mailto:developer@example.com" className="text-blue-500 dark:text-blue-400 hover:underline">
              developer@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
    );
}

export default About;
