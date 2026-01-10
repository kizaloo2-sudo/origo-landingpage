"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Clock, Target, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <SectionContainer className="py-16 sm:py-24 md:py-32 lg:py-40 bg-[#0a0a0a] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#febe5d]/10 border border-[#febe5d]/30 rounded-full">
              <span className="text-xs sm:text-sm font-semibold text-[#febe5d] uppercase tracking-wide">
                How It Works
              </span>
            </div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            Answer 15 focused questions
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#a3a3a3] max-w-3xl mx-auto px-2">
            Get clarity on your go-to-market approach in 3 minutes
          </p>
        </motion.div>

        {/* What You'll Receive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {/* Score */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[#febe5d] transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              Market Signal Readiness Score
            </h3>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              A clear percentage showing where you stand
            </p>
          </div>

          {/* Insights */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[#febe5d] transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              Key Insights
            </h3>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              What's working, what's not, and why
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[#febe5d] transition-all duration-300 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              Clear Next Steps
            </h3>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              Recommendations tailored to your answers
            </p>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 text-base sm:text-lg text-[#a3a3a3] pt-4 sm:pt-8 px-2"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febe5d] flex-shrink-0" />
            <span className="whitespace-nowrap">3 minutes</span>
          </div>
          <div className="hidden sm:block w-px h-5 sm:h-6 bg-white/20" />
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febe5d] flex-shrink-0" />
            <span className="whitespace-nowrap">Free</span>
          </div>
          <div className="hidden sm:block w-px h-5 sm:h-6 bg-white/20" />
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febe5d] flex-shrink-0" />
            <span className="whitespace-nowrap">Instant results</span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
