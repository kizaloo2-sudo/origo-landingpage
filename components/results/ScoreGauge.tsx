"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number; // 0-100
  tier: string;
}

export default function ScoreGauge({ score, tier }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Determine color based on tier
  const getTierColor = () => {
    if (score <= 40) return "#ef4444"; // Red (Tier 1)
    if (score <= 70) return "#fbbf24"; // Yellow (Tier 2)
    return "#10b981"; // Green (Tier 3)
  };

  const tierColor = getTierColor();

  // Circle dimensions
  const size = 280;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Animate score number
  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = score / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* SVG Gauge */}
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#262626"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Animated Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={tierColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              filter: `drop-shadow(0 0 12px ${tierColor}40)`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-6xl md:text-7xl font-bold text-white mb-2">
              {displayScore}%
            </div>
            <div
              className="text-lg font-semibold uppercase tracking-wide"
              style={{ color: tierColor }}
            >
              {tier}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tier Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <p className="text-xl md:text-2xl font-bold text-white mb-2">
          Market Signal Readiness
        </p>
        <p className="text-base text-origo-grey max-w-md">
          Your current ability to decode market signals and direct resources efficiently
        </p>
      </motion.div>
    </div>
  );
}