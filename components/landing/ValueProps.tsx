"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/SectionContainer";
import { Target, Cpu, TrendingUp, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

function ValuePropCard({ icon: Icon, title, description, index }: ValuePropCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    // Detect if device supports hover (desktop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverDevice(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHoverDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleInteraction = () => {
    // Only toggle on click for touch devices
    if (!isHoverDevice) {
      setIsActive(!isActive);
    }
  };

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
      onClick={handleInteraction}
      {...(isHoverDevice && {
        onMouseEnter: () => setIsActive(true),
        onMouseLeave: () => setIsActive(false),
      })}
    >
      {/* Hover Glow Background */}
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl blur-2xl sm:blur-3xl transition-all duration-500 -z-10 will-change-transform ${
        isActive ? 'bg-[#febe5d]/5' : 'bg-[#febe5d]/0'
      }`} />

      {/* Card Container */}
      <div className={`h-full min-h-[320px] sm:min-h-[340px] bg-[#111111]/80 backdrop-blur-xl border-2 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 transition-all duration-300 overflow-hidden ${
        !isHoverDevice ? 'cursor-pointer' : ''
      } ${
        isActive 
          ? 'border-[#febe5d] shadow-[0_0_30px_rgba(254,190,93,0.2)] -translate-y-1 sm:-translate-y-2' 
          : 'border-white/10'
      }`}>
        {/* Icon Container */}
        <div className="mb-5 sm:mb-6">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-lg sm:rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? 'bg-[#febe5d]/20 border-[#febe5d]/40 scale-110' 
              : ''
          }`}>
            <Icon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#febe5d] transition-transform duration-300 ${
              isActive ? 'rotate-12' : ''
            }`} strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 tracking-tight leading-tight transition-colors duration-300 ${
          isActive ? 'text-[#febe5d]' : 'text-white'
        }`}>
          {title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-[#a3a3a3] leading-relaxed">
          {description}
        </p>

        {/* Bottom Border Accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#febe5d] to-transparent transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`} />
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
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#febe5d]/3 rounded-full blur-3xl will-change-transform" />
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
