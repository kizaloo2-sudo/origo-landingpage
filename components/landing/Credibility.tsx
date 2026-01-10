"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Building2, Users, TrendingUp } from "lucide-react";

export default function Credibility() {
  return (
    <SectionContainer className="py-16 sm:py-24 md:py-32 lg:py-40 bg-[#050505] relative overflow-hidden px-4 sm:px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#febe5d]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
                Who We Are
              </span>
            </div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight px-2">
            Who Created This Assessment?
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#a3a3a3] max-w-3xl mx-auto leading-relaxed px-2">
            This assessment is designed by <span className="text-[#febe5d] font-bold">Origo</span>, 
            a Singapore-based Market-Signal & Decision Architecture consultancy.
          </p>
        </motion.div>

        {/* 3 Key Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center sm:col-span-2 md:col-span-1"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              Interpret Real Buyer Activity
            </h3>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              Not opinions. Not surveys. Actual behavior.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              Validate Market Demand
            </h3>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              Before you scale. Before you burn capital.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center sm:col-span-2 md:col-span-1"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              Design Decision Frameworks
            </h3>
            <p className="text-sm sm:text-base text-[#a3a3a3]">
              Architecture before execution begins.
            </p>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
