import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLayerGroup, FaServer, FaWrench, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useTheme } from '../context/context';

const CATEGORY_ICONS = {
  'Frontend': <FaLayerGroup className="inline mr-2 text-blue-500" />,
  'Backend': <FaServer className="inline mr-2 text-emerald-500" />,
};

const CATEGORY_COLORS = [
  { pill: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', dot: 'bg-blue-400' },
  { pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', dot: 'bg-emerald-400' },
  { pill: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', dot: 'bg-violet-400' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

function About() {
  const { theme } = useTheme();
  const [data, setData] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  useEffect(() => {
    fetch('/api/about')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({}));
  }, []);

  if (!data) {
    return (
      <div data-theme={theme} className="bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex items-center justify-center">
        <div className="neumorphism rounded-2xl w-12 h-12 animate-pulse" />
      </div>
    );
  }

  const skills = data.skills || [];
  const experience = data.experience || [];
  const stats = data.stats || [];

  return (
    <div
      data-theme={theme}
      onMouseMove={handleMouseMove}
      className="inset-hover bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 space-y-16">

        {/* — Bio + Stats — */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <motion.div className="md:col-span-2 neumorphism rounded-2xl p-8" {...fadeUp(0)}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-blue-500">Me</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {data.bio || ''}
            </p>
            {data.contact?.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="inline-flex items-center gap-2 mt-6 text-blue-500 dark:text-blue-400 hover:underline font-medium"
              >
                <FaEnvelope /> {data.contact.email}
              </a>
            )}
          </motion.div>

          <motion.div className="flex flex-col gap-4" {...fadeUp(0.1)}>
            {stats.map((s, i) => (
              <div key={s.id || i} className="neumorphism rounded-2xl p-5 text-center">
                <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">{s.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* — Skills — */}
        {skills.length > 0 && (
          <motion.div {...fadeUp(0.15)}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="neumorphism-inset px-3 py-1 rounded-lg text-base text-blue-500 font-mono">01</span>
              Skills &amp; Technologies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {skills.map((cat, ci) => {
                const colors = CATEGORY_COLORS[ci % CATEGORY_COLORS.length];
                return (
                  <motion.div
                    key={cat.id || ci}
                    className="neumorphism rounded-2xl p-6"
                    {...fadeUp(0.2 + ci * 0.08)}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{cat.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(cat.items || []).map((item, ii) => (
                        <span
                          key={ii}
                          className={`text-xs font-medium px-3 py-1 rounded-full neumorphism-inset ${colors.pill}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* — Experience Timeline — */}
        {experience.length > 0 && (
          <motion.div {...fadeUp(0.25)}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="neumorphism-inset px-3 py-1 rounded-lg text-base text-blue-500 font-mono">02</span>
              Experience
            </h3>
            <div className="relative border-l-2 border-blue-400/40 dark:border-blue-500/30 pl-8 space-y-8">
              {experience.map((exp, i) => (
                <motion.div key={exp.id || i} {...fadeUp(0.3 + i * 0.1)}>
                  <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-blue-500 border-4 border-[#e5e5e5] dark:border-[#2d2d2d]" />
                  <div className="neumorphism rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h4>
                      <span className="neumorphism-inset text-xs px-3 py-1 rounded-full text-blue-500 dark:text-blue-400 font-medium flex items-center gap-1">
                        <FaBuilding className="text-[10px]" /> {exp.company}
                      </span>
                      <span className="neumorphism-inset text-xs px-3 py-1 rounded-full text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt className="text-[10px]" /> {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default About;
