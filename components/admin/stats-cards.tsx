'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalUsers: number;
    totalAssessments: number;
    activeUsers: number;
    completionRate: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Assessments',
      value: stats.totalAssessments.toLocaleString(),
      description: 'Completed assessments',
      icon: FileText,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      description: 'Registered users',
      icon: Users,
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      description: 'Average completion rate',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className="bg-[#111111]/80 backdrop-blur-xl border-white/10 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">
                {card.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-[#febe5d]/10">
                <Icon className="w-4 h-4 text-[#febe5d]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {card.value}
              </div>
              <p className="text-xs text-neutral-400">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
