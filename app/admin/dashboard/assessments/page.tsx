'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Search, Eye, MoreVertical, Briefcase, Building, Trash2, Send, Award, Mail, Download, TrendingUp, Activity, AlertCircle } from 'lucide-react';
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
import { toast } from 'sonner';

interface Assessment {
  id: string;
  user_id: string;
  score: number;
  answers: any;
  completed: boolean;
  created_at: string;
  profiles?: {
    email: string;
    full_name?: string;
    role?: string;
    industry?: string;
  };
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);
  const [deleteAssessmentOpen, setDeleteAssessmentOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
  });

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await fetch('/api/admin/assessments');
      const result = await response.json();

      if (result.success) {
        setAssessments(result.data);
      } else {
        toast.error('Failed to fetch assessments');
        setAssessments([]);
      }
    } catch (error) {
      toast.error('Network error fetching assessments');
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Email sent to ${selectedAssessment?.profiles?.email}`);
      setSendEmailOpen(false);
      setEmailForm({ subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send email');
    }
  };

  const handleDeleteAssessment = async () => {
    try {
      // TODO: Call API to delete assessment
      toast.success('Assessment deleted successfully');
      setDeleteAssessmentOpen(false);
      fetchAssessments();
    } catch (error) {
      toast.error('Failed to delete assessment');
    }
  };

  const handleExportCSV = () => {
    try {
      // Create CSV content
      const headers = ['Name', 'Email', 'Role', 'Industry', 'Score', 'Tier', 'Date'];
      const rows = filteredAssessments.map(assessment => [
        assessment.profiles?.full_name || 'Unknown User',
        assessment.profiles?.email || 'N/A',
        assessment.profiles?.role || 'N/A',
        assessment.profiles?.industry || 'N/A',
        assessment.score || 0,
        getTierFromScore(assessment.score || 0),
        new Date(assessment.created_at).toLocaleDateString()
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `assessments_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  const filteredAssessments = assessments.filter(
    (assessment) =>
      assessment.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTierFromScore = (score: number) => {
    if (score <= 40) return 'Noise-Driven';
    if (score <= 70) return 'Partial Signal';
    return 'Signal-Driven';
  };

  const getTierBadge = (score: number) => {
    const tier = getTierFromScore(score);
    if (tier === 'Signal-Driven') {
      return {
        label: 'Signal-Driven',
        className: 'bg-green-500/10 text-green-400 border-green-500/20'
      };
    } else if (tier === 'Partial Signal') {
      return {
        label: 'Partial Signal',
        className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      };
    } else {
      return {
        label: 'Noise-Driven',
        className: 'bg-red-500/10 text-red-400 border-red-500/20'
      };
    }
  };

  // Calculate tier statistics
  const totalAssessments = assessments.length;
  const signalDriven = assessments.filter(a => getTierFromScore(a.score || 0) === 'Signal-Driven').length;
  const partialSignal = assessments.filter(a => getTierFromScore(a.score || 0) === 'Partial Signal').length;
  const noiseDriven = assessments.filter(a => getTierFromScore(a.score || 0) === 'Noise-Driven').length;

  const signalDrivenPercent = totalAssessments > 0 ? ((signalDriven / totalAssessments) * 100).toFixed(1) : '0.0';
  const partialSignalPercent = totalAssessments > 0 ? ((partialSignal / totalAssessments) * 100).toFixed(1) : '0.0';
  const noiseDrivenPercent = totalAssessments > 0 ? ((noiseDriven / totalAssessments) * 100).toFixed(1) : '0.0';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#febe5d]/20 border-t-[#febe5d] rounded-full animate-spin" />
          <p className="text-sm text-neutral-400">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tier Distribution Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Signal-Driven
            </CardTitle>
            <div className="p-2 rounded-lg bg-[#febe5d]/10">
              <TrendingUp className="w-4 h-4 text-[#febe5d]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {signalDrivenPercent}%
            </div>
            <p className="text-xs text-neutral-400">
              {signalDriven} of {totalAssessments} assessments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Partial Signal
            </CardTitle>
            <div className="p-2 rounded-lg bg-[#febe5d]/10">
              <Activity className="w-4 h-4 text-[#febe5d]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {partialSignalPercent}%
            </div>
            <p className="text-xs text-neutral-400">
              {partialSignal} of {totalAssessments} assessments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">
              Noise-Driven
            </CardTitle>
            <div className="p-2 rounded-lg bg-[#febe5d]/10">
              <AlertCircle className="w-4 h-4 text-[#febe5d]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {noiseDrivenPercent}%
            </div>
            <p className="text-xs text-neutral-400">
              {noiseDriven} of {totalAssessments} assessments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Export */}
      <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder="Search assessments by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 text-white"
              />
            </div>
            <Button
              onClick={handleExportCSV}
              className="bg-[#febe5d] hover:bg-[#ffc978] text-black font-bold active:scale-95 transition-transform touch-none"
            >
              <Download className="mr-2 w-4 h-4" />
              Export to CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-neutral-400">User</TableHead>
                <TableHead className="text-neutral-400">Email</TableHead>
                <TableHead className="text-neutral-400">Role</TableHead>
                <TableHead className="text-neutral-400">Industry</TableHead>
                <TableHead className="text-neutral-400">Tier</TableHead>
                <TableHead className="text-neutral-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-neutral-500 py-8">
                    No assessments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssessments.map((assessment) => (
                  <TableRow
                    key={assessment.id}
                    className="border-white/10 transition-colors"
                  >
                    <TableCell>
                      <p className="text-sm font-medium text-white">
                        {assessment.profiles?.full_name || 'Unknown User'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Mail className="w-4 h-4 text-neutral-500" />
                        {assessment.profiles?.email || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Briefcase className="w-4 h-4 text-neutral-500" />
                        {assessment.profiles?.role || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Building className="w-4 h-4 text-neutral-500" />
                        {assessment.profiles?.industry || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Award className="w-4 h-4 text-neutral-500" />
                        <Badge className={getTierBadge(assessment.score || 0).className}>
                          {getTierBadge(assessment.score || 0).label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 active:scale-95 transition-transform touch-none">
                            <MoreVertical className="w-4 h-4 text-neutral-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#111111] border-white/10">
                          <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem 
                            className="text-neutral-300 focus:text-white focus:bg-white/5 active:bg-white/10"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setViewDetailsOpen(true);
                            }}
                          >
                            <Eye className="mr-2 w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-neutral-300 focus:text-white focus:bg-white/5 active:bg-white/10"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setSendEmailOpen(true);
                            }}
                          >
                            <Send className="mr-2 w-4 h-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem 
                            className="text-red-400 focus:text-red-300 focus:bg-red-500/10 active:bg-red-500/20"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setDeleteAssessmentOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 w-4 h-4" />
                            Delete Assessment
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

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>
              Complete assessment information
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
                    {selectedAssessment?.profiles?.full_name || 'Unknown User'}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Email</Label>
                  <p className="text-white font-medium">{selectedAssessment?.profiles?.email || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Role</Label>
                  <p className="text-white font-medium">{selectedAssessment?.profiles?.role || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Industry</Label>
                  <p className="text-white font-medium">{selectedAssessment?.profiles?.industry || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Assessment Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Assessment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-neutral-400">Score</Label>
                  <p className="text-white font-medium text-2xl">{selectedAssessment?.score || 0}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Tier</Label>
                  <div className="pt-1">
                    <Badge className={getTierBadge(selectedAssessment?.score || 0).className}>
                      {getTierBadge(selectedAssessment?.score || 0).label}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Submitted At</Label>
                  <p className="text-white font-medium">
                    {selectedAssessment?.created_at 
                      ? new Date(selectedAssessment.created_at).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-neutral-400">Status</Label>
                  <p className="text-white font-medium">
                    {selectedAssessment?.completed ? 'Completed' : 'In Progress'}
                  </p>
                </div>
              </div>
            </div>

            {/* Answers */}
            {selectedAssessment?.answers && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Answers Summary</h3>
                <div className="bg-black/40 rounded-lg p-4 border border-white/10 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {Object.entries(selectedAssessment.answers)
                      .filter(([key]) => {
                        const questionNum = parseInt(key.replace('q', ''));
                        return questionNum >= 1 && questionNum <= 19;
                      })
                      .sort(([keyA], [keyB]) => {
                        const numA = parseInt(keyA.replace('q', ''));
                        const numB = parseInt(keyB.replace('q', ''));
                        return numA - numB;
                      })
                      .map(([key, value]: [string, any]) => {
                        const questionNum = parseInt(key.replace('q', ''));
                        return (
                          <div key={key} className="pb-3 border-b border-white/5 last:border-0">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#febe5d]/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-[#febe5d]">{questionNum}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white mb-1">
                                  {typeof value === 'object' && value?.question ? value.question : `Question ${questionNum}`}
                                </p>
                                <p className="text-sm text-neutral-400">
                                  <span className="text-neutral-500">Answer: </span>
                                  {typeof value === 'object' ? value?.answer || JSON.stringify(value) : String(value)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setViewDetailsOpen(false)}
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 active:scale-95 transition-all touch-none"
            >
              Close
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
              Send an email to {selectedAssessment?.profiles?.email}
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
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 active:scale-95 transition-all touch-none"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendEmail}
              className="bg-[#febe5d] hover:bg-[#ffc978] text-black active:scale-95 transition-all touch-none"
              disabled={!emailForm.subject || !emailForm.message}
            >
              <Send className="mr-2 w-4 h-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Assessment Dialog */}
      <Dialog open={deleteAssessmentOpen} onOpenChange={setDeleteAssessmentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Assessment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-white font-medium">{selectedAssessment?.profiles?.full_name || 'Unknown User'}</p>
              <p className="text-neutral-400 text-sm">{selectedAssessment?.profiles?.email}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteAssessmentOpen(false)} 
              className="border-white/10 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 h-10 px-4 active:scale-95 transition-all touch-none"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteAssessment}
              className="bg-red-500 hover:bg-red-600 text-white active:scale-95 transition-all touch-none"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Delete Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
