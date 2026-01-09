"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Clock, Target, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <SectionContainer className="py-32 md:py-40 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 bg-[#febe5d]/10 border border-[#febe5d]/30 rounded-full">
              <span className="text-sm font-semibold text-[#febe5d] uppercase tracking-wide">
                How It Works
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Answer 15 focused questions
          </h2>

          <p className="text-xl md:text-2xl text-[#a3a3a3] max-w-3xl mx-auto">
            Get clarity on your go-to-market approach in 3 minutes
          </p>
        </motion.div>

        {/* What You'll Receive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Score */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-2xl p-8 text-center hover:border-[#febe5d] transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Market Signal Readiness Score
            </h3>
            <p className="text-[#a3a3a3]">
              A clear percentage showing where you stand
            </p>
          </div>

          {/* Insights */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-2xl p-8 text-center hover:border-[#febe5d] transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Key Insights
            </h3>
            <p className="text-[#a3a3a3]">
              What's working, what's not, and why
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-2xl p-8 text-center hover:border-[#febe5d] transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Clear Next Steps
            </h3>
            <p className="text-[#a3a3a3]">
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
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-lg text-[#a3a3a3] pt-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#febe5d]" />
            <span>⏱ Takes ~3 minutes</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#febe5d]" />
            <span>🎯 Free</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#febe5d]" />
            <span>📊 Instant results</span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
