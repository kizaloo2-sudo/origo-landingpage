"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Building2, Users, TrendingUp } from "lucide-react";

export default function Credibility() {
  return (
    <SectionContainer className="py-32 md:py-40 bg-[#050505] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#febe5d]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
                Who We Are
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Who Created This Assessment?
          </h2>

          <p className="text-xl md:text-2xl text-[#a3a3a3] max-w-3xl mx-auto leading-relaxed">
            This assessment is designed by <span className="text-[#febe5d] font-bold">Origo</span>, 
            a Singapore-based Market-Signal & Decision Architecture consultancy.
          </p>
        </motion.div>

        {/* Experience Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111111]/60 backdrop-blur-xl border-2 border-[#febe5d]/20 rounded-2xl p-10 md:p-12 mb-16 text-center"
        >
          <p className="text-xl md:text-2xl text-white leading-relaxed mb-6">
            With <span className="text-[#febe5d] font-bold">nearly two decades</span> of cross-market experience, 
            Origo works with leaders to:
          </p>
        </motion.div>

        {/* 3 Key Areas */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Interpret Real Buyer Activity
            </h3>
            <p className="text-[#a3a3a3]">
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Validate Market Demand
            </h3>
            <p className="text-[#a3a3a3]">
              Before you scale. Before you burn capital.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Design Decision Frameworks
            </h3>
            <p className="text-[#a3a3a3]">
              Architecture before execution begins.
            </p>
          </motion.div>
        </div>

        {/* What We Don't Do */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-[#111111]/60 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-10 md:p-12"
        >
          <div className="space-y-6 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">
              We don't sell tools.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              We don't sell raw data.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[#febe5d]">
              We work at the decision layer.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}