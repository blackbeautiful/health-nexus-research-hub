
import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  return (
    <header className="border-b border-border bg-white py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 md:hidden">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Toggle sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </Button>
        </SidebarTrigger>
        <div className="md:w-72 hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients, studies..."
              className="pl-8 bg-background border-muted"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-health-primary">
            3
          </Badge>
        </Button>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-8 w-8 border">
          <div className="flex h-full w-full items-center justify-center bg-health-primary text-white text-xs">
            DR
          </div>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
