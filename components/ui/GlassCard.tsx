import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8",
        className
      )}
    >
      {children}
    </div>
  );
}