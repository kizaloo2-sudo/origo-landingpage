"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Target, Zap, Clock, LucideIcon } from "lucide-react";

interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

function ValuePropCard({ icon: Icon, title, description, index }: ValuePropCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-full"
    >
      {/* Hover Glow Background */}
      <div className="absolute inset-0 bg-[#febe5d]/0 group-hover:bg-[#febe5d]/5 group-active:bg-[#febe5d]/5 rounded-xl sm:rounded-2xl blur-xl transition-all duration-500 -z-10" />

      {/* Card Container */}
      <div className="h-full bg-[#111111]/80 backdrop-blur-xl border-2 border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 group-hover:border-[#febe5d] group-active:border-[#febe5d] group-hover:shadow-[0_0_30px_rgba(254,190,93,0.2)] group-active:shadow-[0_0_30px_rgba(254,190,93,0.2)] group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-active:-translate-y-1 cursor-pointer">
        {/* Icon Container */}
        <div className="mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center group-hover:bg-[#febe5d]/20 group-active:bg-[#febe5d]/20 group-hover:border-[#febe5d]/40 group-active:border-[#febe5d]/40 transition-all duration-300 group-hover:scale-110 group-active:scale-105">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#febe5d] transition-transform duration-300 group-hover:rotate-12 group-active:rotate-6" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight group-hover:text-[#febe5d] group-active:text-[#febe5d] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-[#a3a3a3] leading-relaxed">
          {description}
        </p>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#febe5d] to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const valueProps = [
    {
      icon: Target,
      title: "Market Signal Readiness Score",
      description:
        "A clear percentage showing where you stand",
    },
    {
      icon: Zap,
      title: "Key Insights",
      description:
        "What's working, what's not, and why",
    },
    {
      icon: Clock,
      title: "Clear Next Steps",
      description:
        "Recommendations tailored to your answers",
    },
  ];

  return (
    <SectionContainer className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-[#0a0a0a] relative px-4 sm:px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#febe5d]/3 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 relative z-10"
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

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 relative z-10">
        {valueProps.map((prop, index) => (
          <ValuePropCard
            key={index}
            icon={prop.icon}
            title={prop.title}
            description={prop.description}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
