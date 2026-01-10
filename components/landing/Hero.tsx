"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SectionContainer from "@/components/ui/SectionContainer";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <SectionContainer className="min-h-screen flex items-center justify-center py-16 px-4 sm:py-20 md:py-16 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#febe5d]/8 rounded-full blur-3xl" />
        
        {/* Top Right Accent */}
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#febe5d]/5 rounded-full blur-3xl" />
      </div>

      {/* Content - Centered */}
      <div className="w-full max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#febe5d]/10 border-2 border-[#febe5d]/30 rounded-full shadow-[0_0_20px_rgba(254,190,93,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#febe5d] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-[#febe5d] uppercase tracking-wide whitespace-nowrap">
            Market Signal Readiness Assessment
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight text-white px-2 sm:px-4"
        >
          Are you executing —
          <br />
          or executing in the
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#febe5d] via-[#ffc978] to-[#febe5d] animate-gradient">
            wrong direction?
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#a3a3a3] max-w-4xl leading-relaxed px-2 sm:px-4"
        >
          Take a 3-minute Market Signal Assessment to understand{" "}
          <span className="text-white font-bold">
            where demand really exists, which customers deserve focus, and where time and budget are being wasted.
          </span>
        </motion.p>

        {/* Primary CTA Button - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 sm:pt-4 w-full flex justify-center px-2 sm:px-4"
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => (window.location.href = "/assessment")}
            className="rounded-full text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 font-bold bg-[#febe5d] hover:bg-[#ffc978] text-black shadow-[0_0_30px_rgba(254,190,93,0.5)] hover:shadow-[0_0_50px_rgba(254,190,93,0.7)] transition-all duration-300 w-full sm:w-auto max-w-md"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <span>Start Assessment</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            </span>
          </Button>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
