
import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile,
  Image,
  User,
  Clock
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  sender: string;
  senderAvatar: string;
  timestamp: Date;
  isRead: boolean;
  isCurrentUser: boolean;
};

type Contact = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
};

const MessagingPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Dr. Rebecca Martinez',
      avatar: 'RM',
      role: 'Oncologist',
      lastMessage: 'Your next appointment is scheduled for...',
      lastMessageTime: new Date('2025-03-10T10:23:00'),
      unreadCount: 2,
      status: 'online'
    },
    {
      id: '2',
      name: 'Nurse Jessica Lee',
      avatar: 'JL',
      role: 'Oncology Nurse',
      lastMessage: 'How are you feeling today?',
      lastMessageTime: new Date('2025-03-09T14:05:00'),
      unreadCount: 0,
      status: 'online'
    },
    {
      id: '3',
      name: 'Dr. James Wilson',
      avatar: 'JW',
      role: 'Surgeon',
      lastMessage: 'I've reviewed your latest lab results...',
      lastMessageTime: new Date('2025-03-08T09:30:00'),
      unreadCount: 0,
      status: 'away'
    },
    {
      id: '4',
      name: 'Dr. Anna Lopez',
      avatar: 'AL',
      role: 'Radiation Oncologist',
      lastMessage: 'Please complete the symptom survey.',
      lastMessageTime: new Date('2025-03-07T16:45:00'),
      unreadCount: 0,
      status: 'offline'
    }
  ]);

  const [activeContact, setActiveContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Good morning Sarah, I wanted to check in on how you're feeling after your last treatment cycle.',
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-03-10T09:15:00'),
      isRead: true,
      isCurrentUser: false
    },
    {
      id: '2',
      content: 'I've been experiencing more fatigue than usual, but the nausea is better with the new medication.',
      sender: 'You',
      senderAvatar: 'SP',
      timestamp: new Date('2025-03-10T09:20:00'),
      isRead: true,
      isCurrentUser: true
    },
    {
      id: '3',
      content: 'That's good to hear about the nausea. For the fatigue, try to space your activities throughout the day and get adequate rest.',
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-03-10T09:25:00'),
      isRead: true,
      isCurrentUser: false
    },
    {
      id: '4',
      content: 'Your next appointment is scheduled for March 12th at 9:00 AM. Please arrive 15 minutes early for blood work.',
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-03-10T10:23:00'),
      isRead: false,
      isCurrentUser: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
    
    // Mark messages as read
    if (contact.unreadCount > 0) {
      const updatedContacts = contacts.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      );
      setContacts(updatedContacts);
      
      // In a real app, we would notify the server that messages have been read
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      senderAvatar: 'SP',
      timestamp: new Date(),
      isRead: true,
      isCurrentUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate response in a real-world scenario
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for your message. I'll review this and get back to you as soon as possible.',
        sender: activeContact.name,
        senderAvatar: activeContact.avatar,
        timestamp: new Date(),
        isRead: true,
        isCurrentUser: false
      };
      
      setMessages(prevMessages => [...prevMessages, responseMsg]);
      
      toast({
        title: 'New message',
        description: `${activeContact.name}: Thanks for your message. I'll review this and get back to you as soon as possible.`,
      });
    }, 5000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Layout title="Messages">
      <PageHeader 
        title="Messages" 
        description="Secure messaging with your care team"
        breadcrumbs={[{ label: 'Messages' }]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contacts..."
                className="pl-8"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="care-team" className="flex-1">Care Team</TabsTrigger>
              </TabsList>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <TabsContent value="all" className="space-y-2 mt-0">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                      activeContact.id === contact.id ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <div className="flex h-full w-full items-center justify-center bg-health-primary text-white">
                          {contact.avatar}
                        </div>
                      </Avatar>
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                      {contact.status === 'away' && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground">{formatDate(contact.lastMessageTime)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                      <p className="text-xs truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-health-primary">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="unread" className="space-y-2 mt-0">
                {contacts.filter(c => c.unreadCount > 0).map(contact => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                      activeContact.id === contact.id ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <Avatar className="h-10 w-10">
                      <div className="flex h-full w-full items-center justify-center bg-health-primary text-white">
                        {contact.avatar}
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground">{formatDate(contact.lastMessageTime)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                      <p className="text-xs truncate">{contact.lastMessage}</p>
                    </div>
                    <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-health-primary">
                      {contact.unreadCount}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="care-team" className="space-y-2 mt-0">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                      activeContact.id === contact.id ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <Avatar className="h-10 w-10">
                      <div className="flex h-full w-full items-center justify-center bg-health-primary text-white">
                        {contact.avatar}
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground">{formatDate(contact.lastMessageTime)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-health-primary">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </Card>
        
        <Card className="md:col-span-2 flex flex-col overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <div className="flex h-full w-full items-center justify-center bg-health-primary text-white">
                  {activeContact?.avatar}
                </div>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeContact?.name}</h3>
                <p className="text-xs text-muted-foreground">{activeContact?.status === 'online' ? 'Online' : activeContact?.status === 'away' ? 'Away' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, i) => {
                const showDateHeader = i === 0 || new Date(messages[i-1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateHeader && (
                      <div className="flex justify-center my-4">
                        <Badge variant="outline" className="bg-background">
                          {new Date(message.timestamp).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] flex ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                        {!message.isCurrentUser && (
                          <Avatar className="h-8 w-8 mt-1">
                            <div className="flex h-full w-full items-center justify-center bg-health-primary text-white text-xs">
                              {message.senderAvatar}
                            </div>
                          </Avatar>
                        )}
                        
                        <div>
                          <div className={`rounded-lg py-2 px-3 ${
                            message.isCurrentUser 
                              ? 'bg-health-primary text-white' 
                              : 'bg-muted'
                          }`}>
                            {message.content}
                          </div>
                          <div className={`flex items-center mt-1 text-xs text-muted-foreground ${
                            message.isCurrentUser ? 'justify-end' : 'justify-start'
                          }`}>
                            {formatTime(new Date(message.timestamp))}
                            {message.isCurrentUser && (
                              <span className="ml-1">{message.isRead ? '• Read' : ''}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input 
                placeholder="Type a message..." 
                className="flex-1" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Smile className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default MessagingPage;
