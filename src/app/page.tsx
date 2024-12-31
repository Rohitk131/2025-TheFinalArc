'use client'

import React, { useState, useEffect } from 'react';
import SpaceBackground from '@/components/SpaceBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { IconHourglass } from '@tabler/icons-react';
import { Langar } from 'next/font/google';

const langar = Langar({ weight: '400', style: 'normal', subsets: ['latin'] });

const AnimeProgressTracker = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const animeQuotes = [
    {
      text: "A lesson without pain is meaningless.",
      author: "Fullmetal Alchemist: Brotherhood"
    },
    {
      text: "Power comes in response to a need, not a desire.",
      author: "Dragon Ball Z"
    },
    {
      text: "Fear is not evil. It tells you what your weakness is.",
      author: "Fairy Tail"
    }
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endOfYear = new Date('2025-12-31T23:59:59');
      const now = new Date();
      const difference = endOfYear.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setProgress((1 - difference / (endOfYear.getTime() - new Date('2025-01-01T00:00:00').getTime())) * 100);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % animeQuotes.length);
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-900 to-blue-950 text-white">
      <SpaceBackground />

      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pointer-events-none text-center font-extrabold leading-none mb-8"
        >
          <span className={`${langar.className} block text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-black animate-gradient`}>
            2025: The Final Arc
          </span>
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex items-center justify-center mb-12 bg-gradient-to-r from-blue-950/30 via-cyan-900/20 to-blue-950/30 rounded-full p-6 shadow-lg backdrop-blur-md border border-blue-500/20"
        >
          <IconHourglass className="w-8 h-8 md:w-12 md:h-12 mr-4 animate-pulse text-cyan-400" stroke={1.5} />
          <span className="text-2xl md:text-4xl  font-bold text-gray-300">
            {timeLeft}
          </span>
        </motion.div>

        <div className="w-full max-w-2xl mb-12 relative">
          <div className="h-8 bg-blue-950/50 rounded-full overflow-hidden border border-blue-500/20 backdrop-blur-md shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 opacity-30 animate-shimmer" />
            </motion.div>
          </div>
          <div className="mt-2 text-center font-bold">
            <span className="text-lg text-cyan-300">
              Power Level: {progress.toFixed(2)}%
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl bg-gradient-to-r from-blue-950/30 via-cyan-900/20 to-blue-950/30 rounded-lg p-8 backdrop-blur-md border border-blue-500/20 shadow-lg"
          >
            <p className="text-xl italic mb-2 text-white">"{animeQuotes[currentQuote].text}"</p>
            <p className="text-sm text-cyan-300">
              - {animeQuotes[currentQuote].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimeProgressTracker;