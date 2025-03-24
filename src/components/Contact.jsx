function Contact() {
    return (
      <div className="neumorphism p-8 mx-auto max-w-3xl text-center mt-10">
        <h2 className="text-3xl font-bold text-gray-900">Contact Me</h2>
        <p className="text-gray-700 mt-4">
          Feel free to reach out for collaborations or just a friendly chat!
        </p>
        <form className="mt-6">
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 w-full border rounded-md neumorphism"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 w-full mt-4 border rounded-md neumorphism"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 neumorphism text-gray-900 font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  }
  
  export default Contact; // ✅ Ensure there is a default export
  