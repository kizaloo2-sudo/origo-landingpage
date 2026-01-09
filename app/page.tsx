import Hero from "@/components/landing/Hero";
import ValueProps from "@/components/landing/ValueProps";
import HowItWorks from "@/components/landing/HowItWorks";
import Credibility from "@/components/landing/Credibility";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-origo-black">
      {/* Hero Section */}
      <Hero />

      {/* Value Props Section (The 3 Pillars) */}
      <ValueProps />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Credibility Section */}
      <Credibility />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}