"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SectionContainer from "@/components/ui/SectionContainer";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <SectionContainer className="py-32 md:py-40 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#febe5d]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Start Your Market Signal
            <br />
            <span className="text-[#febe5d]">Assessment</span>
          </h2>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          <div className="flex items-center justify-center gap-3 text-lg text-[#a3a3a3]">
            <CheckCircle2 className="w-6 h-6 text-[#febe5d] flex-shrink-0" />
            <span>Free</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-lg text-[#a3a3a3]">
            <CheckCircle2 className="w-6 h-6 text-[#febe5d] flex-shrink-0" />
            <span>Takes 3 minutes</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-lg text-[#a3a3a3]">
            <CheckCircle2 className="w-6 h-6 text-[#febe5d] flex-shrink-0" />
            <span>Get immediate insight on where to focus — and where to stop</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => (window.location.href = "/assessment")}
            className="rounded-full text-lg md:text-xl px-12 py-8 font-bold bg-[#febe5d] hover:bg-[#ffc978] text-black shadow-[0_0_40px_rgba(254,190,93,0.5)] hover:shadow-[0_0_60px_rgba(254,190,93,0.7)] transition-all duration-300"
          >
            Start the Assessment
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </motion.div>

        {/* Footer Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 pt-12"
        >
          <p className="text-xl md:text-2xl text-[#a3a3a3] leading-relaxed">
            Origo helps leaders{" "}
            <span className="text-white font-bold">stop guessing</span>{" "}
            where growth comes from.
          </p>
          <p className="text-lg md:text-xl text-[#a3a3a3] mt-4">
            We clarify direction before execution — so time, capital, and effort compound.
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}