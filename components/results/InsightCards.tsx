"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface InsightCardsProps {
  score: number;
}

export default function InsightCards({ score }: InsightCardsProps) {
  // Determine insights based on tier
  const getInsights = () => {
    if (score <= 40) {
      // Tier 1: Noise-Driven
      return [
        {
          icon: Target,
          title: "🔴 High Noise Detected",
          description:
            "Your current strategy relies heavily on assumptions rather than verified signals. You are likely executing in areas with low buying intent. Immediate Action: Stop scaling spend until demand signals are validated.",
          iconColor: "#ef4444",
        },
        {
          icon: Users,
          title: "🔴 CAC/LTV Risk Warning",
          description:
            "You are currently treating all prospects as equal. This dilutes your team's focus and spikes CAC. You need a 'Negative Filtering' system immediately to disqualify bad fits early.",
          iconColor: "#ef4444",
        },
        {
          icon: Zap,
          title: "🔴 Reactive Execution",
          description:
            "You are reacting to the market rather than directing it. This leads to burnout and unpredictable revenue. Pause execution; build a decision framework first.",
          iconColor: "#ef4444",
        },
      ];
    } else if (score <= 70) {
      // Tier 2: Partial Signal
      return [
        {
          icon: Target,
          title: "🟡 Signal Gaps Identified",
          description:
            "You have found some market fit, but consistency is lacking. You are likely winning deals but unsure why or how to repeat it efficiently. You need to bridge the gap between sales data and marketing targets.",
          iconColor: "#fbbf24",
        },
        {
          icon: Users,
          title: "🟡 Priority Leaks",
          description:
            "Your team knows who the ideal customer is, but they still spend 30-40% of their time on low-probability leads. Tighten your qualification criteria to free up resources.",
          iconColor: "#fbbf24",
        },
        {
          icon: Zap,
          title: "🟡 Process Inconsistency",
          description:
            "Success currently depends on individual talent, not system architecture. If your top performer leaves, revenue risks dropping. Document the decision logic now.",
          iconColor: "#fbbf24",
        },
      ];
    } else {
      // Tier 3: Growth Ready
      return [
        {
          icon: Target,
          title: "🟢 Signal Clarity Confirmed",
          description:
            "You have strong market visibility. The challenge now is not 'finding' customers, but 'architecting' decisions to capture them before competitors do. Focus on speed and precision.",
          iconColor: "#10b981",
        },
        {
          icon: Users,
          title: "🟢 High-Value Focus",
          description:
            "Your prioritization is solid. Shift your focus to 'Account Expansion' and increasing LTV. Use your signal data to predict their next need before they ask.",
          iconColor: "#10b981",
        },
        {
          icon: Zap,
          title: "🟢 Systematic Scale",
          description:
            "You are ready for 'Decision Architecture'. Automate the signal reading so leaders can focus on the 8% of high-impact relationships (The Origo 92/8 Rule).",
          iconColor: "#10b981",
        },
      ];
    }
  };

  const insights = getInsights();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1 + index * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <GlassCard className="h-full">
            {/* Icon */}
            <div className="mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${insight.iconColor}20` }}
              >
                <insight.icon
                  className="w-6 h-6"
                  style={{ color: insight.iconColor }}
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
              {insight.title}
            </h3>
            <p className="text-sm md:text-base text-origo-grey leading-relaxed">
              {insight.description}
            </p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}