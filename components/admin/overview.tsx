'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', users: 45, assessments: 32 },
  { name: 'Feb', users: 52, assessments: 41 },
  { name: 'Mar', users: 61, assessments: 48 },
  { name: 'Apr', users: 58, assessments: 52 },
  { name: 'May', users: 73, assessments: 64 },
  { name: 'Jun', users: 85, assessments: 71 },
  { name: 'Jul', users: 92, assessments: 85 },
  { name: 'Aug', users: 88, assessments: 79 },
  { name: 'Sep', users: 95, assessments: 88 },
  { name: 'Oct', users: 102, assessments: 94 },
  { name: 'Nov', users: 110, assessments: 102 },
  { name: 'Dec', users: 125, assessments: 115 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="name"
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
          }}
          cursor={{ fill: 'rgba(254, 190, 93, 0.1)' }}
        />
        <Bar
          dataKey="users"
          fill="#febe5d"
          radius={[8, 8, 0, 0]}
          name="Users"
        />
        <Bar
          dataKey="assessments"
          fill="#888"
          radius={[8, 8, 0, 0]}
          name="Assessments"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
