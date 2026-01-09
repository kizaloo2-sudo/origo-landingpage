"use client";

import { motion } from "framer-motion";
import { TOTAL_QUESTIONS } from "@/data/questions";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions?: number;
}

export default function ProgressBar({
  currentQuestion,
  totalQuestions = TOTAL_QUESTIONS,
}: ProgressBarProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full space-y-3">
      {/* Progress Text */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-origo-grey">
          Question{" "}
          <span className="text-white font-semibold">{currentQuestion + 1}</span>{" "}
          of {totalQuestions}
        </span>
        <span className="text-origo-gold font-semibold">{Math.round(progress)}%</span>
      </div>

      {/* Progress Bar Track */}
      <div className="relative w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
        {/* Animated Progress Fill (The Laser) */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-origo-gold shadow-laser"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}