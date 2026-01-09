'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quiz-store';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const {
    calculateScorePercentage,
    getTier,
    reset,
    answers,
    contactInfo,
  } = useQuizStore();

  const [score, setScore] = useState(0);
  const [tier, setTier] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if quiz is completed
    if (!answers || answers.length === 0 || !contactInfo) {
      // Try to restore a recent submission snapshot from sessionStorage (fallback for full reloads)
      try {
        if (typeof window !== 'undefined') {
          const raw = sessionStorage.getItem('last_quiz_result');
          if (raw) {
            const parsed = JSON.parse(raw);
            setScore(parsed.score ?? 0);
            setTier(parsed.tier ?? '');
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        // ignore
      }

      router.push('/assessment');
      return;
    }

    // Calculate results
    const calculatedScore = calculateScorePercentage();
    const calculatedTier = getTier();

    setScore(calculatedScore);
    setTier(calculatedTier);
    setIsLoading(false);
  }, [answers, contactInfo, calculateScorePercentage, getTier, router]);

  const handleStartOver = () => {
    reset();
    router.push('/');
  };

  const handleBookCall = () => {
    // Navigate to booking or CTA
    window.open('https://cal.com/origo/strategy', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#febe5d] border-t-transparent"></div>
          <p className="text-white mt-4">Analyzing your results...</p>
        </div>
      </div>
    );
  }

  // Tier configuration
  const getTierConfig = () => {
    if (score <= 40) {
      return {
        color: 'red',
        title: 'Noise-Driven Execution',
        description: 'Your current strategy relies heavily on assumptions rather than verified signals. You are likely executing in areas with low buying intent.',
        cta: 'Watch Signal Masterclass',
        ctaAction: () => window.open('/masterclass', '_blank'),
      };
    } else if (score <= 70) {
      return {
        color: 'yellow',
        title: 'Partial Signal Clarity',
        description: 'You have found some market fit, but consistency is lacking. You are likely winning deals but unsure why or how to repeat it efficiently.',
        cta: 'Book Strategy Call',
        ctaAction: handleBookCall,
      };
    } else {
      return {
        color: 'green',
        title: 'Signal-Driven Growth',
        description: 'You have strong market visibility. The challenge now is not finding customers, but architecting decisions to capture them before competitors do.',
        cta: 'Book Executive Strategy Call',
        ctaAction: handleBookCall,
      };
    }
  };

  const tierConfig = getTierConfig();

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#febe5d]/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Your Market Signal Assessment
          </h1>
          <p className="text-neutral-400 text-lg">
            Based on your responses, here's where you stand
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[#febe5d]/20 to-transparent border-4 border-[#febe5d] mb-4">
              <span className="text-5xl font-bold text-white">{score}%</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {tierConfig.title}
            </h2>
            <p className="text-neutral-400">
              Market Signal Readiness Score
            </p>
          </div>

          {/* Description */}
          <div className="bg-black/40 rounded-lg p-6 mb-6">
            <p className="text-neutral-300 text-lg leading-relaxed">
              {tierConfig.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={tierConfig.ctaAction}
              className="flex-1 py-4 px-6 bg-[#febe5d] hover:bg-[#ffc978] text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(254,190,93,0.3)] flex items-center justify-center gap-2"
            >
              {tierConfig.cta}
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleStartOver}
              className="py-4 px-6 bg-transparent border border-white/20 text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Start Over
            </button>
          </div>
        </motion.div>

        {/* Insights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Market Signal Insight */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Market Signal
            </h3>
            <p className="text-neutral-400 text-sm">
              {score <= 40
                ? 'High noise detected. Validate demand signals before scaling.'
                : score <= 70
                ? 'Signal gaps identified. Improve consistency in market detection.'
                : 'Signal clarity confirmed. Focus on precision and speed.'}
            </p>
          </div>

          {/* Customer Priority */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Customer Priority
            </h3>
            <p className="text-neutral-400 text-sm">
              {score <= 40
                ? 'CAC/LTV risk. Implement negative filtering to disqualify bad fits.'
                : score <= 70
                ? 'Priority leaks detected. Tighten qualification criteria.'
                : 'High-value focus. Shift to account expansion and LTV growth.'}
            </p>
          </div>

          {/* Execution */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Execution
            </h3>
            <p className="text-neutral-400 text-sm">
              {score <= 40
                ? 'Reactive execution. Pause and build decision framework first.'
                : score <= 70
                ? 'Process inconsistency. Document decision logic for repeatability.'
                : 'Systematic scale ready. Automate signal reading for efficiency.'}
            </p>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-neutral-500 text-sm"
        >
          <p>
            This assessment is based on the ORIGO Market Signal Framework.
            <br />
            For personalized guidance, book a strategy call with our team.
          </p>
        </motion.div>
      </div>
    </div>
  );
}