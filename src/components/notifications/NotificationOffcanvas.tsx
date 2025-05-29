
import React, { useState } from 'react';
import { Bell, X, Check, Clock, Calendar, FileText, TestTube, User, MessageSquare, Trash2, CheckCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'message' | 'appointment' | 'result' | 'patient' | 'protocol' | 'system';
  link?: string;
};

const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'Dr. Rebecca Martinez sent you a message about your treatment plan.',
    timestamp: new Date(Date.now() - 15 * 60000),
    isRead: false,
    type: 'message',
    link: '/messages'
  },
  {
    id: '2',
    title: 'Appointment Reminder',
    message: 'You have an appointment scheduled for tomorrow at 10:00 AM.',
    timestamp: new Date(Date.now() - 2 * 3600000),
    isRead: false,
    type: 'appointment',
    link: '/appointments'
  },
  {
    id: '3',
    title: 'Lab Results Available',
    message: 'Your recent blood work results are now available for review.',
    timestamp: new Date(Date.now() - 5 * 3600000),
    isRead: true,
    type: 'result',
    link: '/lab-results'
  },
  {
    id: '4',
    title: 'Study Protocol Updated',
    message: 'The BEACON-CRC Phase II Trial protocol has been updated to version 2.1.',
    timestamp: new Date(Date.now() - 24 * 3600000),
    isRead: true,
    type: 'protocol',
    link: '/studies/protocol-setup'
  },
  // Add more demo notifications for pagination testing
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `demo-${i + 5}`,
    title: `Demo Notification ${i + 5}`,
    message: `This is a demo notification message ${i + 5} for testing pagination.`,
    timestamp: new Date(Date.now() - (i + 5) * 3600000),
    isRead: i % 3 === 0,
    type: 'system' as const,
    link: '/dashboard'
  }))
];

const ITEMS_PER_PAGE = 10;

const NotificationOffcanvas = () => {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: "All your notifications have been marked as read.",
    });
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "All notifications deleted",
      description: "All notifications have been cleared.",
    });
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

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[480px] p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={deleteAllNotifications}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 py-4 border-b">
            <TabsList className="grid w-full grid-cols-4 h-10 p-1 bg-muted/50 rounded-lg border">
              <TabsTrigger 
                value="all" 
                className="h-8 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                className="h-8 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger 
                value="message" 
                className="h-8 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger 
                value="system" 
                className="h-8 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
              >
                System
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="m-0 flex-1">
            {paginatedNotifications.length > 0 ? (
              <>
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="divide-y">
                    {paginatedNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 hover:bg-muted/50 relative cursor-pointer transition-colors ${!notification.isRead ? 'bg-muted/20' : ''}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h5 className={`text-sm font-medium truncate pr-2 ${!notification.isRead ? 'font-semibold' : ''}`}>
                                {notification.title}
                              </h5>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{getTimeAgo(notification.timestamp)}</span>
                              </div>
                              {!notification.isRead && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        {!notification.isRead && (
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-12 px-4 text-center">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Separator />
        
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-center text-xs"
            onClick={() => {
              navigate('/settings/notifications');
              setIsOpen(false);
            }}
          >
            Notification Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationOffcanvas;
