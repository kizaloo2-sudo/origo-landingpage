"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Target, Cpu, TrendingUp, LucideIcon } from "lucide-react";

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
      className="h-full md:group relative z-0"
    >
      {/* Hover Glow Background - Desktop Only */}
      <div className="hidden md:block absolute inset-0 rounded-2xl blur-3xl -z-10 md:transition-all md:duration-500 md:group-hover:bg-[#febe5d]/5" />

      {/* Card Container - Mobile: Static, Desktop: Hover effects */}
      <div 
        className="h-full min-h-[320px] sm:min-h-[340px] bg-[#111111] border-2 border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 overflow-hidden relative md:transition-all md:duration-300 md:group-hover:border-[#febe5d] md:group-hover:shadow-[0_0_30px_rgba(254,190,93,0.2)] md:group-hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#febe5d]"
        tabIndex={0}
        role="article"
        aria-label={`${title} - Value proposition card`}
      >
        
        {/* Icon Container */}
        <div className="mb-5 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center md:transition-all md:duration-300 md:group-hover:bg-[#febe5d]/20 md:group-hover:border-[#febe5d]/40 md:group-hover:scale-110">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#febe5d] md:transition-transform md:duration-300 md:group-hover:rotate-12" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 tracking-tight leading-tight text-white md:transition-colors md:duration-300 md:group-hover:text-[#febe5d]">
          {title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-[#a3a3a3] leading-relaxed">
          {description}
        </p>

        {/* Bottom Border Accent - Desktop Only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#febe5d] to-transparent opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

export default function ValueProps() {
  const valueProps = [
    {
      icon: Target,
      title: "Market Direction",
      description:
        "Are you targeting markets with real buying signals? We help you identify where actual demand exists, not where you hope it does.",
    },
    {
      icon: Cpu,
      title: "Customer Priority",
      description:
        "Are you focusing on buyers who can actually convert? Stop wasting time on prospects who will never close.",
    },
    {
      icon: TrendingUp,
      title: "Execution Efficiency",
      description:
        "Are you burning CAC on noise instead of signal? Learn where your resources should go — and where they shouldn't.",
    },
  ];

  return (
    <SectionContainer className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 relative px-6 sm:px-8">
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
        className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-6 sm:mb-7"
        >
          <div className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#febe5d]/10 border border-[#febe5d]/30 rounded-full">
            <span className="text-sm sm:text-base font-semibold text-[#febe5d] uppercase tracking-wide">
              Why Take This Assessment?
            </span>
          </div>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-5 sm:mb-6 leading-snug sm:leading-tight tracking-tight px-4 sm:px-6">
          Most businesses don't lose because{" "}
          <span className="text-[#febe5d]">they lack execution.</span>
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#a3a3a3] max-w-3xl mx-auto px-4 sm:px-6 leading-relaxed font-medium">
          They lose because they{" "}
          <span className="text-[#febe5d] font-bold">execute in the wrong direction — for too long.</span>
        </p>
      </motion.div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative z-10">
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
