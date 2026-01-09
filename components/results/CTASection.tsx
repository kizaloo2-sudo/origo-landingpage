"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar, PlayCircle } from "lucide-react";

interface CTASectionProps {
  score: number;
}

export default function CTASection({ score }: CTASectionProps) {
  const isTier1 = score <= 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      className="text-center space-y-6"
    >
      {/* Divider */}
      <div className="w-24 h-1 bg-origo-gold mx-auto rounded-full" />

      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {isTier1 ? "Next Step: Learn the System" : "Ready to Scale?"}
      </h2>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-origo-grey max-w-2xl mx-auto">
        {isTier1
          ? "Before scaling, you need clarity. Watch our Signal Masterclass to understand how elite companies architect decisions."
          : "You've validated market fit. Now let's architect a system that compounds growth without burning resources."}
      </p>

      {/* CTA Button */}
      <div className="pt-4">
        {isTier1 ? (
          // Tier 1: Education Loop (Video)
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open("https://youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
            }
            className="text-lg px-10 py-5"
          >
            <PlayCircle className="mr-2 w-5 h-5" />
            Watch Signal Masterclass
          </Button>
        ) : (
          // Tier 2/3: Sales Loop (Booking)
          <Button
            variant="default"
            size="lg"
            onClick={() => window.open("https://cal.com/origo/strategy", "_blank")}
            className="text-lg px-10 py-5 bg-[#febe5d] hover:bg-[#ffc978] text-black"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Book Strategy Call
          </Button>
        )}
      </div>

      {/* Trust Signal */}
      <p className="text-sm text-origo-grey/60 pt-4">
        {isTier1
          ? "Free 45-minute masterclass · No credit card required"
          : "30-minute strategy session · Free · No obligation"}
      </p>
    </motion.div>
  );
}