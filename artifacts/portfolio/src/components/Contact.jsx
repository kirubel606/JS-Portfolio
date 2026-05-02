import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaPaperPlane } from 'react-icons/fa';
import { useTheme } from '../context/context';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <div
      data-theme={theme}
      onMouseMove={handleMouseMove}
      className="inset-hover bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-2xl py-24">
        <motion.div {...fadeUp(0)}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Contact <span className="text-blue-500">Me</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Feel free to reach out for collaborations or just a friendly chat!
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div {...fadeUp(0.1)} className="neumorphism rounded-2xl p-10 text-center space-y-4">
            <div className="text-4xl">✉️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Message Sent!</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Thanks for reaching out — I'll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 px-5 py-2 rounded-xl neumorphism text-gray-900 dark:text-white text-sm font-medium"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form onSubmit={onSubmit} {...fadeUp(0.1)} className="neumorphism rounded-2xl p-8 space-y-5">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={onChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={onChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg neumorphism-inset bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none"
            />

            {status === 'error' && (
              <p className="text-sm text-red-500 dark:text-red-400">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center gap-2 px-6 py-3 rounded-xl neumorphism text-gray-900 dark:text-white font-semibold disabled:opacity-60"
            >
              <FaPaperPlane className={status === 'sending' ? 'animate-pulse' : ''} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}

export default Contact;
