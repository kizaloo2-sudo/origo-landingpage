import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-2xl font-bold text-[#febe5d] tracking-tight">
              ORIGO
            </h3>
            <p className="text-sm text-neutral-500">
              Market-Signal Architecture
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="text-sm text-neutral-400 hover:text-[#febe5d] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-neutral-400 hover:text-[#febe5d] transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-neutral-500">
            © {currentYear} Origo. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}