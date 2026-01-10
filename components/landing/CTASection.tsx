"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SectionContainer from "@/components/ui/SectionContainer";
import { ArrowRight } from "lucide-react";

export default function CTASection() {

  return (
    <SectionContainer className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-[#0a0a0a] relative overflow-hidden px-4 sm:px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#febe5d]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            Start Your Market Signal
            <br />
            <span className="text-[#febe5d]">Assessment</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#a3a3a3] mb-10 sm:mb-12 md:mb-16 px-2">
            Discover where your growth opportunities really are
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20 flex justify-center"
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => (window.location.href = "/assessment")}
            className="group rounded-full text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 font-bold bg-[#febe5d] hover:bg-[#ffc978] active:bg-[#ffc978] text-black shadow-[0_0_30px_rgba(254,190,93,0.5)] hover:shadow-[0_0_60px_rgba(254,190,93,0.8)] active:shadow-[0_0_60px_rgba(254,190,93,0.8)] transition-all duration-300 w-auto inline-flex"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <span>Start the Assessment</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>

        {/* Footer Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-white/10 pt-10 sm:pt-12 md:pt-16"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-[#a3a3a3] leading-relaxed px-2 mb-3 sm:mb-4">
            Origo helps leaders{" "}
            <span className="text-white font-bold">stop guessing</span>{" "}
            where growth comes from.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#a3a3a3]/80 px-2 max-w-3xl mx-auto">
            We clarify direction before execution — so time, capital, and effort compound.
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
