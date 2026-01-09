"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Question, QuestionOption } from "@/data/questions";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string | number;
  onAnswer: (value: string | number, score?: number) => void;
}

export default function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
}: QuestionCardProps) {
  const isTextInput = question.type === "text" || question.type === "email";
  const isTextarea = question.type === "textarea";

  // Handle option selection
  const handleSelectOption = (option: QuestionOption | string) => {
    if (typeof option === "string") {
      onAnswer(option);
    } else {
      onAnswer(option.value, option.value);
    }
  };

  // Handle text input
  const handleTextInput = (value: string) => {
    onAnswer(value);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {/* Question Card */}
        <div className="bg-origo-charcoal border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
            {question.text}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {/* Select Options (Multiple Choice) */}
            {question.options && !isTextarea && !isTextInput && (
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isObject = typeof option === "object";
                  const optionValue = isObject ? option.value : option;
                  const optionLabel = isObject ? option.label : option;
                  const isSelected = currentAnswer === optionValue;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        "w-full text-left p-5 rounded-xl border-2 transition-all duration-300 group",
                        isSelected
                          ? "bg-origo-gold/10 border-origo-gold shadow-gold-glow"
                          : "bg-transparent border-white/10 hover:border-origo-gold/50 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-base md:text-lg font-medium transition-colors",
                            isSelected ? "text-white" : "text-origo-grey group-hover:text-white"
                          )}
                        >
                          {optionLabel}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3, ease: "backOut" }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-origo-gold" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Text Input */}
            {isTextInput && (
              <input
                type={question.type}
                placeholder="Type your answer..."
                value={(currentAnswer as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                className="w-full bg-transparent border-2 border-white/10 rounded-xl px-6 py-4 text-white text-lg placeholder:text-origo-grey focus:border-origo-gold focus:outline-none transition-colors duration-300"
              />
            )}

            {/* Textarea */}
            {isTextarea && (
              <textarea
                placeholder="Share your thoughts... (Optional)"
                value={(currentAnswer as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                rows={4}
                className="w-full bg-transparent border-2 border-white/10 rounded-xl px-6 py-4 text-white text-lg placeholder:text-origo-grey focus:border-origo-gold focus:outline-none transition-colors duration-300 resize-none"
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}