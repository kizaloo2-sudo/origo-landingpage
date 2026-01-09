'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, TrendingUp, CheckCircle } from 'lucide-react';

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
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Assessments',
      value: stats.totalAssessments.toLocaleString(),
      change: '+8.2%',
      icon: FileText,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: '+5.3%',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      change: '+2.1%',
      icon: CheckCircle,
      color: 'text-[#febe5d]',
      bgColor: 'bg-[#febe5d]/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className="bg-[#111111]/80 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {card.value}
              </div>
              <p className="text-xs text-green-400">
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
