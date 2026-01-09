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
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-full"
    >
      {/* Hover Glow Background */}
      <div className="absolute inset-0 bg-[#febe5d]/0 group-hover:bg-[#febe5d]/5 rounded-2xl blur-xl transition-all duration-500 -z-10" />

      {/* Card Container */}
      <div className="h-full bg-[#111111]/80 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-300 group-hover:border-[#febe5d] group-hover:shadow-[0_0_30px_rgba(254,190,93,0.2)] group-hover:-translate-y-2">
        {/* Icon Container */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-xl bg-[#febe5d]/10 border border-[#febe5d]/20 flex items-center justify-center group-hover:bg-[#febe5d]/20 group-hover:border-[#febe5d]/40 transition-all duration-300">
            <Icon className="w-8 h-8 text-[#febe5d]" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#febe5d] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base md:text-lg text-[#a3a3a3] leading-relaxed">
          {description}
        </p>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#febe5d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    <SectionContainer className="py-32 md:py-40 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#febe5d]/3 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 md:mb-24 relative z-10"
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
              Why Take This Assessment?
            </span>
          </div>
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Most businesses don’t lose because
          <br />
          <span className="text-[#febe5d]">they lack execution.</span>
        </h2>

        <p className="text-xl md:text-2xl text-[#a3a3a3] max-w-3xl mx-auto">
          They lose because they{" "}
          <span className="text-[#febe5d] font-bold">execute in the wrong direction — for too long.</span>
        </p>
      </motion.div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
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