'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/admin/overview';
import { 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 45 },
  { month: 'Feb', users: 52 },
  { month: 'Mar', users: 61 },
  { month: 'Apr', users: 58 },
  { month: 'May', users: 73 },
  { month: 'Jun', users: 85 },
  { month: 'Jul', users: 92 },
  { month: 'Aug', users: 88 },
  { month: 'Sep', users: 95 },
  { month: 'Oct', users: 102 },
  { month: 'Nov', users: 110 },
  { month: 'Dec', users: 125 },
];

const scoreDistributionData = [
  { name: 'High (70+)', value: 35, color: '#10b981' },
  { name: 'Medium (40-69)', value: 45, color: '#f59e0b' },
  { name: 'Low (0-39)', value: 20, color: '#ef4444' },
];

const completionRateData = [
  { month: 'Jan', rate: 78 },
  { month: 'Feb', rate: 82 },
  { month: 'Mar', rate: 79 },
  { month: 'Apr', rate: 85 },
  { month: 'May', rate: 88 },
  { month: 'Jun', rate: 91 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Growth Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+23.5%</div>
            <p className="text-xs text-green-400 mt-1">↑ 12.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Engagement</CardTitle>
            <Activity className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87.3%</div>
            <p className="text-xs text-blue-400 mt-1">↑ 5.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Conversion</CardTitle>
            <Target className="w-4 h-4 text-[#febe5d]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">64.2%</div>
            <p className="text-xs text-[#febe5d] mt-1">↑ 8.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Retention</CardTitle>
            <Users className="w-4 h-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">91.8%</div>
            <p className="text-xs text-purple-400 mt-1">↑ 3.4% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList className="bg-[#111111]/80 border border-white/10">
          <TabsTrigger
            value="growth"
            className="data-[state=active]:bg-[#febe5d] data-[state=active]:text-black"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            User Growth
          </TabsTrigger>
          <TabsTrigger
            value="distribution"
            className="data-[state=active]:bg-[#febe5d] data-[state=active]:text-black"
          >
            <PieChart className="w-4 h-4 mr-2" />
            Score Distribution
          </TabsTrigger>
          <TabsTrigger
            value="completion"
            className="data-[state=active]:bg-[#febe5d] data-[state=active]:text-black"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Completion Rate
          </TabsTrigger>
        </TabsList>

        {/* User Growth Chart */}
        <TabsContent value="growth">
          <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">User Growth Trend</CardTitle>
              <CardDescription className="text-neutral-400">
                Monthly new user registrations over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#febe5d"
                    strokeWidth={3}
                    dot={{ fill: '#febe5d', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Score Distribution */}
        <TabsContent value="distribution">
          <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Score Distribution</CardTitle>
              <CardDescription className="text-neutral-400">
                Distribution of assessment scores across all users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RePieChart>
                  <Pie
                    data={scoreDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {scoreDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completion Rate */}
        <TabsContent value="completion">
          <Card className="bg-[#111111]/80 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Assessment Completion Rate</CardTitle>
              <CardDescription className="text-neutral-400">
                Percentage of completed assessments over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={completionRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
