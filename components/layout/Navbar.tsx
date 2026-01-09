"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="w-full px-5 md:px-10 max-w-7xl mx-auto">
        <div className="mt-6 bg-black/80 backdrop-blur-2xl border-2 border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#febe5d]/30 transition-all duration-500">
          <div className="flex items-center justify-between px-6 md:px-8 py-4">
            {/* Logo with Glow */}
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                {/* Logo Glow */}
                <div className="absolute inset-0 bg-[#febe5d]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Logo Text */}
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white relative z-10 group-hover:text-[#febe5d] transition-colors duration-300">
                  ORIGO
                </h1>
              </div>

              {/* Sparkle Icon (visible on hover) */}
              <Sparkles className="w-4 h-4 text-[#febe5d] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button
                variant="default"
                size="lg"
                onClick={() => window.open("https://cal.com/origo/strategy", "_blank")}
                className="px-8 py-3 text-base font-semibold bg-[#febe5d] hover:bg-[#ffc978] text-black"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book Strategy Call
              </Button>
            </div>

            {/* CTA Button - Mobile */}
            <div className="md:hidden">
              <Button
                variant="default"
                onClick={() => window.open("https://cal.com/origo/strategy", "_blank")}
                className="px-5 py-2.5 text-sm bg-[#febe5d] hover:bg-[#ffc978] text-black"
              >
                <Calendar className="mr-2 w-3 h-3" />
                Book Call
              </Button>
            </div>
          </div>

          {/* Bottom Glow Border */}
          <div className="h-px bg-linear-to-r from-transparent via-[#febe5d]/20 to-transparent" />
        </div>
      </div>
    </motion.nav>
  );
}