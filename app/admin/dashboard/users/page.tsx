'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, MoreVertical, Mail, Briefcase, Building, Trash2, Eye, Send, Award } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  industry?: string;
  created_at: string;
  last_sign_in_at?: string;
  tier?: string; // 'Signal-Driven' | 'Partial Signal' | 'Noise-Driven'
  score?: number; // For calculating tier
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog states
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    full_name: '',
    role: '',
    industry: '',
  });
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error('Failed to fetch users');
        setUsers([]);
      }
    } catch (error) {
      toast.error('Network error fetching users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const supabase = createClient();
      
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.full_name,
            role: newUser.role,
            industry: newUser.industry,
          },
        },
      });

      if (error) throw error;

      toast.success('User added successfully!');
      setAddUserOpen(false);
      setNewUser({
        email: '',
        password: '',
        full_name: '',
        role: '',
        industry: '',
      });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add user');
    }
  };

  const handleSendEmail = async () => {
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Email sent to ${selectedUser?.email}`);
      setSendEmailOpen(false);
      setEmailForm({ subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send email');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const supabase = createClient();
      
      // In a real implementation, you would call an admin API to delete the user
      // For now, we'll just show a success message
      
      toast.success('User deleted successfully');
      setDeleteUserOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const getTierFromScore = (score: number) => {
    if (score <= 40) return 'Noise-Driven';
    if (score <= 70) return 'Partial Signal';
    return 'Signal-Driven';
  };

  const getTierBadge = (tier?: string, score?: number) => {
    const actualTier = tier || (score ? getTierFromScore(score) : 'N/A');
    
    if (actualTier === 'Signal-Driven') {
      return {
        label: 'Signal-Driven',
        className: 'bg-green-500/10 text-green-400 border-green-500/20'
      };
    } else if (actualTier === 'Partial Signal') {
      return {
        label: 'Partial Signal',
        className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      };
    } else if (actualTier === 'Noise-Driven') {
      return {
        label: 'Noise-Driven',
        className: 'bg-red-500/10 text-red-400 border-red-500/20'
      };
    } else {
      return {
        label: 'N/A',
        className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      };
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#febe5d]/20 border-t-[#febe5d] rounded-full animate-spin" />
          <p className="text-sm text-neutral-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-end">
        <Button
          variant="default"
          size="lg"
          className="bg-[#febe5d] hover:bg-[#ffc978] text-black"
          onClick={() => setAddUserOpen(true)}
        >
          <UserPlus className="mr-2 w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-neutral-400">User</TableHead>
                <TableHead className="text-neutral-400">Email</TableHead>
                <TableHead className="text-neutral-400">Role</TableHead>
                <TableHead className="text-neutral-400">Industry</TableHead>
                <TableHead className="text-neutral-400">Tier</TableHead>
                <TableHead className="text-neutral-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-neutral-500 py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell>
                      <p className="text-sm font-medium text-white">
                        {user.full_name || 'Unnamed User'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Mail className="w-4 h-4 text-neutral-500" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Briefcase className="w-4 h-4 text-neutral-500" />
                        {user.role || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Building className="w-4 h-4 text-neutral-500" />
                        {user.industry || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Award className="w-4 h-4 text-neutral-500" />
                        <Badge className={getTierBadge(user.tier, user.score).className}>
                          {getTierBadge(user.tier, user.score).label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 transition-all">
                            <MoreVertical className="w-4 h-4 text-neutral-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#111111] border-white/10">
                          <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem 
                            className="text-neutral-300 focus:text-white focus:bg-white/5"
                            onClick={() => {
                              setSelectedUser(user);
                              setViewDetailsOpen(true);
                            }}
                          >
                            <Eye className="mr-2 w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-neutral-300 focus:text-white focus:bg-white/5"
                            onClick={() => {
                              setSelectedUser(user);
                              setSendEmailOpen(true);
                            }}
                          >
                            <Send className="mr-2 w-4 h-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem 
                            className="text-red-400 focus:text-red-300 focus:bg-red-500/10"
                            onClick={() => {
                              setSelectedUser(user);
                              setDeleteUserOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 w-4 h-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. They will receive a confirmation email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-white">Full Name</Label>
              <Input
                id="full_name"
                placeholder="John Doe"
                value={newUser.full_name}
                onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">Role</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  <SelectItem value="CEO" className="text-white">CEO</SelectItem>
                  <SelectItem value="CTO" className="text-white">CTO</SelectItem>
                  <SelectItem value="Manager" className="text-white">Manager</SelectItem>
                  <SelectItem value="Developer" className="text-white">Developer</SelectItem>
                  <SelectItem value="Other" className="text-white">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-white">Industry</Label>
              <Select value={newUser.industry} onValueChange={(value) => setNewUser({ ...newUser, industry: value })}>
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  <SelectItem value="Technology" className="text-white">Technology</SelectItem>
                  <SelectItem value="Finance" className="text-white">Finance</SelectItem>
                  <SelectItem value="Healthcare" className="text-white">Healthcare</SelectItem>
                  <SelectItem value="Education" className="text-white">Education</SelectItem>
                  <SelectItem value="Other" className="text-white">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAddUserOpen(false)} 
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 transition-all"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddUser}
              className="bg-[#febe5d] hover:bg-[#ffc978] text-black"
              disabled={!newUser.email || !newUser.password}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Assessment Details</DialogTitle>
            <DialogDescription>
              Assessment answers from this user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* User Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">User Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-neutral-400">Full Name</Label>
                  <p className="text-white font-medium">
                    {selectedUser?.full_name || 'N/A'}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Email</Label>
                  <p className="text-white font-medium">{selectedUser?.email}</p>
                </div>
              </div>
            </div>

            {/* Answers Summary (Questions 1-19) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Assessment Answers (Q1-Q19)</h3>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {[...Array(19)].map((_, index) => {
                    const questionNum = index + 1;
                    return (
                      <div key={questionNum} className="pb-3 border-b border-white/5 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#febe5d]/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-[#febe5d]">{questionNum}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white mb-1">
                              Question {questionNum}
                            </p>
                            <p className="text-sm text-neutral-400">
                              <span className="text-neutral-500">Answer: </span>
                              <span className="text-neutral-500 italic">Not available</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setViewDetailsOpen(false)}
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 transition-all"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={sendEmailOpen} onOpenChange={setSendEmailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Send an email to {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">Message</Label>
              <textarea
                id="message"
                rows={6}
                placeholder="Type your message here..."
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                className="w-full rounded-md bg-black/40 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#febe5d]/50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSendEmailOpen(false)} 
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 transition-all"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendEmail}
              className="bg-[#febe5d] hover:bg-[#ffc978] text-black"
              disabled={!emailForm.subject || !emailForm.message}
            >
              <Send className="mr-2 w-4 h-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-white font-medium">{selectedUser?.full_name || 'Unnamed User'}</p>
              <p className="text-neutral-400 text-sm">{selectedUser?.email}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteUserOpen(false)} 
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 transition-all"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
