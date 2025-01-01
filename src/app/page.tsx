"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, Hourglass } from "lucide-react";

interface AnimeQuote {
  text: string;
  author: string;
}

interface FloatingElementProps {
  delay: number;
  children: React.ReactNode;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  delay,
  children,
}) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const AnimeProgressTracker: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [currentQuote, setCurrentQuote] = useState<number>(0);
  const [animateNumber, setAnimateNumber] = useState<boolean>(false);

  const animeQuotes: AnimeQuote[] = [
    {
      text: "A lesson without pain is meaningless.",
      author: "Fullmetal Alchemist: Brotherhood",
    },
    {
      text: "Power comes in response to a need, not a desire.",
      author: "Dragon Ball Z",
    },
    {
      text: "Fear is not evil. It tells you what your weakness is.",
      author: "Fairy Tail",
    },
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endOfYear = new Date("2025-12-31T23:59:59");
      const now = new Date();
      const difference = endOfYear.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("0d 0h 0m 0s");
        setProgress(100);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setProgress(
        (1 -
          difference /
            (endOfYear.getTime() - new Date("2025-01-01").getTime())) *
          100,
      );
      setAnimateNumber((prev) => !prev);
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
  }, [animeQuotes.length]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-8" />
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-1/4 w-1 h-1 bg-blue-400 rounded-full blur-sm" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-300 rounded-full blur-sm" />
        </FloatingElement>
        <FloatingElement delay={4}>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full blur-sm" />
        </FloatingElement>
      </div>
      <div className="w-full max-w-2xl mx-auto px-6 py-12 space-y-16 z-10">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl md:text-7xl font-bold text-center tracking-tight bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
        >
          2025
          <span className="block text-lg md:text-xl font-light mt-2 text-blue-300">
            Your Story Awaits
          </span>
        </motion.h1>

        <div className="space-y-12">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center space-x-4 text-blue-300 bg-white/5 py-4 px-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
            >
              <Clock className="w-8 h-8 animate-pulse" />
              <motion.span
                key={animateNumber.toString()}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-mono text-2xl tracking-wider"
              >
                {timeLeft}
              </motion.span>
            </motion.div>
            <span className="text-blue-400/60 text-sm">
              Time remaining in 2025
            </span>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 relative"
                >
                  <div className="absolute inset-0 bg-shine animate-shine" />
                  <motion.div
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-3 -top-3 bg-blue-500/20 p-2 rounded-full backdrop-blur-sm"
              >
                <Hourglass className="w-4 h-4 text-blue-300 animate-spin" />
              </motion.div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-400 text-sm font-medium">
                Progress
              </span>
              <motion.span
                key={progress}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-blue-300 font-bold text-lg"
              >
                {progress.toFixed(1)}%
              </motion.span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3 bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <p className="text-base md:text-lg text-blue-100 font-light leading-relaxed">
              "{animeQuotes[currentQuote].text}"
            </p>
            <p className="text-sm text-blue-400 font-medium">
              {animeQuotes[currentQuote].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimeProgressTracker;
