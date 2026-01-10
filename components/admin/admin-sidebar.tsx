'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Assessments',
    href: '/admin/dashboard/assessments',
    icon: FileText,
  },
  {
    name: 'Analytics',
    href: '/admin/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
];

export function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 flex flex-col',
          'bg-[#111111]/80 backdrop-blur-xl border-r border-white/10',
          'transition-all duration-300 ease-in-out',
          isOpen ? 'w-64' : 'w-0 lg:w-20',
          'overflow-hidden'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#febe5d] to-[#ff9d00] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            {isOpen && (
              <span className="text-xl font-bold text-white tracking-tight">
                ORIGO
              </span>
            )}
          </div>
          {isOpen && (
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-white/5 rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-[#febe5d]/10 text-[#febe5d] shadow-[0_0_15px_rgba(254,190,93,0.1)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5',
                  !isOpen && 'justify-center'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all',
              'text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10',
              !isOpen && 'justify-center'
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
