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

        {/* What You'll Receive - 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 relative z-10">
          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative h-full"
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-[#febe5d]/0 group-hover:bg-[#febe5d]/5 rounded-xl sm:rounded-2xl blur-xl transition-all duration-500 -z-10" />

            {/* Card Container */}
            <div className="h-full bg-[#111111]/80 backdrop-blur-xl border-2 border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 group-hover:border-[#febe5d] group-hover:shadow-[0_0_30px_rgba(254,190,93,0.2)] group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              {/* Icon Container */}
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center group-hover:bg-[#febe5d]/20 group-hover:border-[#febe5d]/40 transition-all duration-300">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight group-hover:text-[#febe5d] transition-colors duration-300">
                Market Signal Readiness Score
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#a3a3a3] leading-relaxed">
                A clear percentage showing where you stand
              </p>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#febe5d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative h-full"
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-[#febe5d]/0 group-hover:bg-[#febe5d]/5 rounded-xl sm:rounded-2xl blur-xl transition-all duration-500 -z-10" />

            {/* Card Container */}
            <div className="h-full bg-[#111111]/80 backdrop-blur-xl border-2 border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 group-hover:border-[#febe5d] group-hover:shadow-[0_0_30px_rgba(254,190,93,0.2)] group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              {/* Icon Container */}
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center group-hover:bg-[#febe5d]/20 group-hover:border-[#febe5d]/40 transition-all duration-300">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight group-hover:text-[#febe5d] transition-colors duration-300">
                Key Insights
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#a3a3a3] leading-relaxed">
                What's working, what's not, and why
              </p>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#febe5d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative h-full"
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-[#febe5d]/0 group-hover:bg-[#febe5d]/5 rounded-xl sm:rounded-2xl blur-xl transition-all duration-500 -z-10" />

            {/* Card Container */}
            <div className="h-full bg-[#111111]/80 backdrop-blur-xl border-2 border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 group-hover:border-[#febe5d] group-hover:shadow-[0_0_30px_rgba(254,190,93,0.2)] group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              {/* Icon Container */}
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center group-hover:bg-[#febe5d]/20 group-hover:border-[#febe5d]/40 transition-all duration-300">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight group-hover:text-[#febe5d] transition-colors duration-300">
                Clear Next Steps
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#a3a3a3] leading-relaxed">
                Recommendations tailored to your answers
              </p>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#febe5d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
