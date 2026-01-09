import Hero from "@/components/landing/Hero";
import ValueProps from "@/components/landing/ValueProps";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-origo-black">
      {/* Hero Section */}
      <Hero />

      {/* Value Props Section (The 3 Pillars) */}
      <ValueProps />
    </main>
  );
}