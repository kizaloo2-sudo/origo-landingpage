"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SectionContainer from "@/components/ui/SectionContainer";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";

export default function CTASection() {
  const benefits = [
    {
      icon: Shield,
      title: "Free Forever",
      description: "No credit card, no commitment"
    },
    {
      icon: Clock,
      title: "3 Minutes",
      description: "Quick but comprehensive"
    },
    {
      icon: Zap,
      title: "Instant Clarity",
      description: "Know where to focus — and where to stop"
    }
  ];

  return (
    <SectionContainer className="py-16 sm:py-24 md:py-32 lg:py-40 bg-[#0a0a0a] relative overflow-hidden px-4 sm:px-6">
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

        {/* Benefits Cards - 3 Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group relative"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-[#febe5d]/0 group-hover:bg-[#febe5d]/5 rounded-xl blur-lg transition-all duration-500 -z-10" />
              
              {/* Card */}
              <div className="bg-[#111111]/60 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:border-[#febe5d] group-hover:shadow-[0_0_20px_rgba(254,190,93,0.2)] group-hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-lg bg-[#febe5d]/10 border border-[#febe5d]/30 flex items-center justify-center group-hover:bg-[#febe5d]/20 group-hover:border-[#febe5d]/50 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#febe5d]" strokeWidth={2.5} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-[#a3a3a3]">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => (window.location.href = "/assessment")}
            className="group rounded-full text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 font-bold bg-[#febe5d] hover:bg-[#ffc978] text-black shadow-[0_0_30px_rgba(254,190,93,0.5)] hover:shadow-[0_0_60px_rgba(254,190,93,0.8)] transition-all duration-300 w-full sm:w-auto max-w-md"
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
