'use client';

import { useState } from 'react';
import { Menu, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleNotificationsOpen = () => {
    setNotificationsOpen(true);
    // Clear notification count when opened
    setNotificationCount(0);
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#111111]/50 backdrop-blur-xl flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-neutral-400" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-lg w-96">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button 
          onClick={handleNotificationsOpen}
          className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-neutral-400" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#febe5d] text-black text-xs">
              {notificationCount}
            </Badge>
          )}
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-white/5 rounded-lg px-3 py-2 transition-colors">
              <div className="text-left">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-neutral-500">admin@origo.com</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#111111] border-white/10">
            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="text-neutral-300 focus:text-white focus:bg-white/5 cursor-pointer"
              onClick={() => setProfileOpen(true)}
            >
              <User className="mr-2 w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-neutral-300 focus:text-white focus:bg-white/5 cursor-pointer"
              onClick={() => router.push('/admin/dashboard/settings')}
            >
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              You have 3 notifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">New user registered</p>
              <p className="text-xs text-neutral-500">2 minutes ago</p>
            </div>
            <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Assessment completed</p>
              <p className="text-xs text-neutral-500">1 hour ago</p>
            </div>
            <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">System update available</p>
              <p className="text-xs text-neutral-500">3 hours ago</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setNotificationsOpen(false)}
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 transition-all"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Profile</DialogTitle>
            <DialogDescription>
              Your account information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-[#febe5d] text-black text-xl font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-white">Admin User</p>
                <p className="text-sm text-neutral-400">System Administrator</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-neutral-400">Email</Label>
                <p className="text-white font-medium">admin@origo.com</p>
              </div>
              <div className="space-y-1">
                <Label className="text-neutral-400">Role</Label>
                <p className="text-white font-medium">Administrator</p>
              </div>
              <div className="space-y-1">
                <Label className="text-neutral-400">Last Login</Label>
                <p className="text-white font-medium">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setProfileOpen(false)}
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 transition-all"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
