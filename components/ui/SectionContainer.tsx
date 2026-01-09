import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "w-full px-5 py-10 md:px-10 md:py-20 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
}