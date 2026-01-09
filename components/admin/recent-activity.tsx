'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    user: 'John Doe',
    email: 'john@example.com',
    action: 'Completed assessment',
    time: '2 minutes ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    status: 'completed',
  },
  {
    user: 'Jane Smith',
    email: 'jane@example.com',
    action: 'Started new assessment',
    time: '15 minutes ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    status: 'in-progress',
  },
  {
    user: 'Mike Johnson',
    email: 'mike@example.com',
    action: 'Registered new account',
    time: '1 hour ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    status: 'new',
  },
  {
    user: 'Sarah Williams',
    email: 'sarah@example.com',
    action: 'Updated profile',
    time: '2 hours ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    status: 'updated',
  },
  {
    user: 'Tom Brown',
    email: 'tom@example.com',
    action: 'Completed assessment',
    time: '3 hours ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
    status: 'completed',
  },
];

const statusColors = {
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  new: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  updated: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback className="bg-[#febe5d]/20 text-[#febe5d]">
              {activity.user
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">{activity.user}</p>
              <Badge
                variant="outline"
                className={`text-xs ${statusColors[activity.status as keyof typeof statusColors]}`}
              >
                {activity.status}
              </Badge>
            </div>
            <p className="text-sm text-neutral-400">{activity.action}</p>
            <p className="text-xs text-neutral-600">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
