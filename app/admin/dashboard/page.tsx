'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/admin/overview';
import { StatsCards } from '@/components/admin/stats-cards';

interface Stats {
  totalUsers: number;
  totalAssessments: number;
  activeUsers: number;
  completionRate: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAssessments: 0,
    activeUsers: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const result = await response.json();

      if (result.success) {
        setStats({
          totalUsers: result.data.totalUsers,
          totalAssessments: result.data.totalAssessments,
          activeUsers: result.data.activeUsers,
          completionRate: result.data.completionRate,
        });
      } else {
        console.error('Failed to fetch stats:', result.error);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#febe5d]/20 border-t-[#febe5d] rounded-full animate-spin" />
          <p className="text-sm text-neutral-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Overview Chart - Full Width */}
      <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Overview</CardTitle>
          <CardDescription className="text-neutral-400">
            User activity and assessment completion over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <Overview />
        </CardContent>
      </Card>
    </div>
  );
}
