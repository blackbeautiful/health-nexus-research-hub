
import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Paperclip, 
  Smile,
  Image,
  Phone,
  Video,
  ArrowLeft,
  Check,
  CheckCheck
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  sender: string;
  senderAvatar: string;
  timestamp: Date;
  isRead: boolean;
  isCurrentUser: boolean;
  status: 'sent' | 'delivered' | 'read';
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
  lastSeen?: Date;
};

const MessagingPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Dr. Rebecca Martinez',
      avatar: 'RM',
      role: 'Oncologist',
      lastMessage: 'Your next appointment is scheduled for...',
      lastMessageTime: new Date('2025-01-10T10:23:00'),
      unreadCount: 2,
      status: 'online'
    },
    {
      id: '2',
      name: 'Nurse Jessica Lee',
      avatar: 'JL',
      role: 'Oncology Nurse',
      lastMessage: 'How are you feeling today?',
      lastMessageTime: new Date('2025-01-09T14:05:00'),
      unreadCount: 0,
      status: 'online',
      lastSeen: new Date('2025-01-09T16:30:00')
    },
    {
      id: '3',
      name: 'Dr. James Wilson',
      avatar: 'JW',
      role: 'Surgeon',
      lastMessage: "I've reviewed your latest lab results...",
      lastMessageTime: new Date('2025-01-08T09:30:00'),
      unreadCount: 0,
      status: 'away',
      lastSeen: new Date('2025-01-08T12:00:00')
    },
    {
      id: '4',
      name: 'Dr. Anna Lopez',
      avatar: 'AL',
      role: 'Radiation Oncologist',
      lastMessage: 'Please complete the symptom survey.',
      lastMessageTime: new Date('2025-01-07T16:45:00'),
      unreadCount: 0,
      status: 'offline',
      lastSeen: new Date('2025-01-07T18:00:00')
    }
  ]);

  const [activeContact, setActiveContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Good morning Sarah, I wanted to check in on how you're feeling after your last treatment cycle.",
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-01-10T09:15:00'),
      isRead: true,
      isCurrentUser: false,
      status: 'read'
    },
    {
      id: '2',
      content: "I've been experiencing more fatigue than usual, but the nausea is better with the new medication.",
      sender: 'You',
      senderAvatar: 'SP',
      timestamp: new Date('2025-01-10T09:20:00'),
      isRead: true,
      isCurrentUser: true,
      status: 'read'
    },
    {
      id: '3',
      content: "That's good to hear about the nausea. For the fatigue, try to space your activities throughout the day and get adequate rest.",
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-01-10T09:25:00'),
      isRead: true,
      isCurrentUser: false,
      status: 'read'
    },
    {
      id: '4',
      content: "Your next appointment is scheduled for March 12th at 9:00 AM. Please arrive 15 minutes early for blood work.",
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-01-10T10:23:00'),
      isRead: false,
      isCurrentUser: false,
      status: 'delivered'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const { toast } = useToast();

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
    setShowMobileChat(true);
    
    if (contact.unreadCount > 0) {
      const updatedContacts = contacts.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      );
      setContacts(updatedContacts);
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
      isCurrentUser: true,
      status: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMsg.id ? { ...msg, status: 'read' } : msg
      ));
    }, 3000);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getLastSeenText = (contact: Contact) => {
    if (contact.status === 'online') return 'online';
    if (!contact.lastSeen) return 'last seen recently';
    
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - contact.lastSeen.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `last seen ${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `last seen ${Math.floor(diffMinutes / 60)}h ago`;
    return `last seen ${formatDate(contact.lastSeen)}`;
  };

  return (
    <MainLayout>
      <PageHeader 
        title="Messages" 
        description="Secure messaging with your care team"
      />
      
      <div className="flex h-[calc(100vh-12rem)] bg-background rounded-lg overflow-hidden border">
        {/* Contacts List */}
        <div className={`w-full md:w-1/3 border-r bg-card ${showMobileChat ? 'hidden md:block' : 'block'}`}>
          {/* Header */}
          <div className="p-4 border-b bg-card">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search or start new chat"
                className="pl-10 bg-background"
              />
            </div>
          </div>
          
          {/* Contact List */}
          <ScrollArea className="flex-1">
            {contacts.map(contact => (
              <div
                key={contact.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  activeContact.id === contact.id ? 'bg-muted' : ''
                }`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                      {contact.avatar}
                    </div>
                  </Avatar>
                  {contact.status === 'online' && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm truncate">{contact.name}</h4>
                    <span className="text-xs text-muted-foreground ml-2">{formatDate(contact.lastMessageTime)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{contact.role}</p>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-green-500 text-white rounded-full text-xs">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setShowMobileChat(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10">
                <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                  {activeContact?.avatar}
                </div>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeContact?.name}</h3>
                <p className="text-xs text-muted-foreground">{getLastSeenText(activeContact)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
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
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-muted/20">
            <div className="space-y-4">
              {messages.map((message, i) => {
                const showDateHeader = i === 0 || 
                  new Date(messages[i-1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateHeader && (
                      <div className="flex justify-center my-4">
                        <Badge variant="secondary" className="bg-background text-xs px-3 py-1">
                          {new Date(message.timestamp).toLocaleDateString(undefined, { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] ${message.isCurrentUser ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                        <div className={`rounded-2xl py-2 px-4 max-w-full break-words ${
                          message.isCurrentUser 
                            ? 'bg-primary text-primary-foreground rounded-br-md' 
                            : 'bg-card border rounded-bl-md'
                        }`}>
                          {message.content}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                          message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <span>{formatTime(new Date(message.timestamp))}</span>
                          {message.isCurrentUser && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="p-4 border-t bg-card">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  placeholder="Type a message..." 
                  className="pr-20 rounded-full"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                size="icon"
                className="rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagingPage;
