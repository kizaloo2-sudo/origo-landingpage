'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuizStore } from '@/store/quiz-store';
import { ASSESSMENT_QUESTIONS } from '@/data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

// Type for question options
type QuestionOption = 
  | string 
  | { label: string; value: number | string };

export default function QuizContainer() {
  const router = useRouter();
  const {
    currentStep,
    setAnswer,
    nextStep,
    previousStep,
    getCurrentQuestion,
    getAnswer,
    isQuizComplete,
    submitQuiz,
    isSubmitting,
    submissionError,
    hasSubmitted,
  } = useQuizStore();

  const [localSubmitting, setLocalSubmitting] = useState(false);

  const currentQuestion = getCurrentQuestion();
  const currentAnswer = currentQuestion ? getAnswer(currentQuestion.id) : undefined;
  const isLastQuestion = currentStep === ASSESSMENT_QUESTIONS.length - 1;
  const canGoNext = currentAnswer !== undefined;

  // Handle answer selection
  const handleAnswerSelect = (value: string | number) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, value);
    }
  };

  // Handle next button
  const handleNext = async () => {
    if (isLastQuestion && isQuizComplete()) {
      if (isSubmitting || localSubmitting || hasSubmitted) return; // prevent re-entry
      setLocalSubmitting(true);
      try {
        await handleSubmit();
      } finally {
        setLocalSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  // Handle submit with enhanced error handling
  const handleSubmit = async () => {
    try {
      console.log('🚀 Starting submission...');
      await submitQuiz();
      console.log('✅ Submission successful, redirecting...');
      router.push('/results');
    } catch (error) {
      console.error('❌ Submission error:', error);
      // Error is already set in store, just log it here
    }
  };

  // Handle previous button
  const handlePrevious = () => {
    if (currentStep > 0) {
      previousStep();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Calculate progress
  const progress = ((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#febe5d]/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-400">
              Question {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}
            </span>
            <span className="text-sm text-[#febe5d] font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#febe5d] to-[#ffc978]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6"
          >
            {/* Category Badge */}
            {currentQuestion.category && (
              <div className="inline-block mb-4 px-3 py-1 bg-[#febe5d]/10 border border-[#febe5d]/20 rounded-full">
                <span className="text-xs font-medium text-[#febe5d] uppercase tracking-wide">
                  {currentQuestion.category}
                </span>
              </div>
            )}

            {/* Question Text */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
              {currentQuestion.text}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'select' && currentQuestion.options && (
                <>
                  {currentQuestion.options.map((option: QuestionOption, index: number) => {
                    const optionValue = typeof option === 'object' && 'value' in option 
                      ? option.value 
                      : option;
                    const optionLabel = typeof option === 'object' && 'label' in option 
                      ? option.label 
                      : option;
                    
                    // ✅ แก้ไข: เช็ค isSelected ให้ถูกต้อง
                    // เปรียบเทียบทั้ง value และ label เพราะ store อาจเก็บอย่างใดอย่างหนึ่ง
                    const isSelected = 
                      currentAnswer === optionValue || 
                      String(currentAnswer) === String(optionValue) ||
                      currentAnswer === optionLabel || 
                      String(currentAnswer) === String(optionLabel);

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(optionValue)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-[#febe5d] bg-[#febe5d]/10'
                            : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5'
                        }`}
                      >
                        <span className={`text-base ${
                          isSelected ? 'text-white font-medium' : 'text-neutral-300'
                        }`}>
                          {String(optionLabel)}
                        </span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* Text Input */}
              {currentQuestion.type === 'text' && (
                <input
                  type="text"
                  value={String(currentAnswer || '')}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#febe5d]/50 focus:ring-2 focus:ring-[#febe5d]/20 transition-all"
                />
              )}

              {/* Email Input */}
              {currentQuestion.type === 'email' && (
                <input
                  type="email"
                  value={String(currentAnswer || '')}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#febe5d]/50 focus:ring-2 focus:ring-[#febe5d]/20 transition-all"
                />
              )}

              {/* Textarea */}
              {currentQuestion.type === 'textarea' && (
                <textarea
                  value={String(currentAnswer || '')}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  placeholder="Enter your answer..."
                  rows={4}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#febe5d]/50 focus:ring-2 focus:ring-[#febe5d]/20 transition-all resize-none"
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Error Message - Enhanced Design */}
        {submissionError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-300 mb-1">
                  เกิดข้อผิดพลาด
                </h3>
                <p className="text-sm text-red-200/90">{submissionError}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg transition-all duration-200 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {/* Next/Submit Button */}
          <button
            onClick={handleNext}
            disabled={!canGoNext || isSubmitting || localSubmitting || hasSubmitted}
            className="flex items-center gap-2 px-8 py-3 bg-[#febe5d] hover:bg-[#ffc978] text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(254,190,93,0.3)]"
          >
            <span>
              {isSubmitting 
                ? 'กำลังส่ง...' 
                : isLastQuestion 
                  ? 'ส่งแบบประเมิน' 
                  : 'ถัดไป'
              }
            </span>
            {!isLastQuestion && !isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}