
import React, { useState } from 'react';
import { Bell, X, Check, Clock, Calendar, FileText, TestTube, User, MessageSquare } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'message' | 'appointment' | 'result' | 'patient' | 'protocol' | 'system';
  link?: string;
};

interface NotificationCenterProps {
  initialNotifications?: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  initialNotifications = [] 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      setIsOpen(false);
    }
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'result':
        return <TestTube className="h-4 w-4 text-green-500" />;
      case 'patient':
        return <User className="h-4 w-4 text-orange-500" />;
      case 'protocol':
        return <FileText className="h-4 w-4 text-teal-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-health-primary"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length > 0 ? (
          <ScrollArea className="h-[300px] p-0">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 hover:bg-muted/50 relative cursor-pointer ${!notification.isRead ? 'bg-muted/20' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h5 className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                          {notification.title}
                        </h5>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 -mt-1 -mr-1 opacity-50 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 absolute right-3 bottom-3 opacity-50 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="py-8 px-4 text-center">
            <Bell className="mx-auto h-6 w-6 text-muted-foreground mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
        
        <Separator />
        
        <div className="p-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-center text-xs justify-center"
            onClick={() => {
              navigate('/settings');
              setIsOpen(false);
            }}
          >
            Notification Settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
