"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Building2, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Credibility() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      icon: Users,
      title: "Interpret Real Buyer Activity",
      description: "Not opinions. Not surveys. Actual behavior.",
    },
    {
      icon: TrendingUp,
      title: "Validate Market Demand",
      description: "Before you scale. Before you burn capital.",
    },
    {
      icon: Building2,
      title: "Design Decision Frameworks",
      description: "Architecture before execution begins.",
    },
  ];

  return (
    <SectionContainer className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-[#050505] relative overflow-hidden px-4 sm:px-6">
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
          className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isActive = activeCard === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className={`text-center cursor-pointer ${
                  index === 0 ? 'sm:col-span-2 md:col-span-1' : ''
                } ${index === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}
                onClick={() => setActiveCard(isActive ? null : index)}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#febe5d]/20 border-[#febe5d]/40 scale-110' 
                    : ''
                }`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d] transition-transform duration-300 ${
                    isActive ? 'rotate-12' : ''
                  }`} strokeWidth={2} />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
                  isActive ? 'text-[#febe5d]' : 'text-white'
                }`}>
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#a3a3a3]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
