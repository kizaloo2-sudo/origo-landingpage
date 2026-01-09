"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SectionContainer from "@/components/ui/SectionContainer";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <SectionContainer className="min-h-screen flex items-center justify-center py-12 md:py-16 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#febe5d]/8 rounded-full blur-3xl" />
        
        {/* Top Right Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#febe5d]/5 rounded-full blur-3xl" />
      </div>

      {/* Content - Centered */}
      <div className="w-full max-w-5xl mx-auto text-center space-y-10 relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#febe5d]/10 border-2 border-[#febe5d]/30 rounded-full shadow-[0_0_20px_rgba(254,190,93,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-[#febe5d]" />
          <span className="text-sm font-semibold text-[#febe5d] uppercase tracking-wide">
            Market Signal Readiness Assessment
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-white px-4"
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
          className="text-xl md:text-2xl lg:text-3xl text-[#a3a3a3] max-w-4xl leading-relaxed px-4"
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
          className="pt-4 w-full flex justify-center"
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => (window.location.href = "/assessment")}
            className="rounded-full text-lg md:text-xl px-10 py-7 font-bold bg-[#febe5d] hover:bg-[#ffc978] text-black shadow-[0_0_40px_rgba(254,190,93,0.5)] hover:shadow-[0_0_60px_rgba(254,190,93,0.7)] transition-all duration-300"
          >
            Start Market Signal Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-base text-[#a3a3a3]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#febe5d] shadow-[0_0_8px_rgba(254,190,93,0.6)]" />
            <span>3-minute assessment</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#febe5d] shadow-[0_0_8px_rgba(254,190,93,0.6)]" />
            <span>No credit card required</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#febe5d] shadow-[0_0_8px_rgba(254,190,93,0.6)]" />
            <span>Instant results</span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}