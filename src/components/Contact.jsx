import { useTheme } from '../context/context'; // Import the context


function Contact() {
  const { theme } = useTheme(); // Access the theme context

    return (
      <div data-theme={theme} className='bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex justify-center items-center'>

      <div  className="neumorphism p-8 mx-auto max-w-3xl text-center mt-10">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900">Contact Me</h2>
        <p className="dark:text-gray-400 text-gray-700 mt-4">
          Feel free to reach out for collaborations or just a friendly chat!
        </p>
        <form className="mt-6 dark:text-white">
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 w-full border-none rounded-md neumorphism-inset"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 w-full mt-4 rounded-md neumorphism-inset"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 neumorphism dark:text-white text-gray-900 font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
      </div>
    );
  }
  
  export default Contact; // ✅ Ensure there is a default export
  