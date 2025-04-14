
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NotificationCenter from '@/components/notifications/NotificationCenter';

interface HeaderProps {
  title?: string;
}

const demoNotifications = [
  {
    id: '1',
    title: 'New Message',
    message: 'Dr. Rebecca Martinez sent you a message about your treatment plan.',
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    isRead: false,
    type: 'message' as const,
    link: '/messages'
  },
  {
    id: '2',
    title: 'Appointment Reminder',
    message: 'You have an appointment scheduled for tomorrow at 10:00 AM.',
    timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
    isRead: false,
    type: 'appointment' as const,
    link: '/appointments'
  },
  {
    id: '3',
    title: 'Lab Results Available',
    message: 'Your recent blood work results are now available for review.',
    timestamp: new Date(Date.now() - 5 * 3600000), // 5 hours ago
    isRead: true,
    type: 'result' as const,
    link: '/lab-results'
  },
  {
    id: '4',
    title: 'Study Protocol Updated',
    message: 'The BEACON-CRC Phase II Trial protocol has been updated to version 2.1.',
    timestamp: new Date(Date.now() - 24 * 3600000), // 24 hours ago
    isRead: true,
    type: 'protocol' as const,
    link: '/studies/protocol-setup'
  }
];

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4 py-3 md:px-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-lg font-medium md:text-xl">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
          <NotificationCenter initialNotifications={demoNotifications} />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
