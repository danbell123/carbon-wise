import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/themeContext';

const iconAnimationVariants = {
  initial: { y: -30, opacity: 0 },
  in: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } },
  out: { y: 30, opacity: 0, transition: { duration: 0.2 } },
  transition: {
    duration: 1,
    ease: "backInOut",
    times: [0, 0.25, 0.5, 0.85, 1],
  }
};

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme("");

  // Helper state to manage the icon transition timing
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setIsAnimating(false); // End animation
    }, 200); // Set timeout to match the 'out' animation duration
  };

  return (
    <button onClick={toggleTheme} className="relative p-8 w-min text-lg bg-bg-main hover:bg-bg-main rounded-lg flex items-center justify-center overflow-hidden" style={{ height: '40px', width: '40px' }}>
      <AnimatePresence mode='wait'>
        <motion.span
          key={theme} // Key change triggers animation
          className={`material-symbols-outlined ${theme === 'dark' ? 'text-yellow-400' : 'text-text-colour-primary'}`}
          variants={iconAnimationVariants}
          initial="initial"
          animate="in"
          exit="out"
          style={{ position: 'absolute' }}
        >
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ToggleThemeButton;
