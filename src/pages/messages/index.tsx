
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
  CheckCheck,
  Camera,
  Mic,
  Plus,
  X
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  type: 'text' | 'image' | 'document' | 'voice';
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
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      content: "I've been experiencing more fatigue than usual, but the nausea is better with the new medication.",
      sender: 'You',
      senderAvatar: 'SP',
      timestamp: new Date('2025-01-10T09:20:00'),
      isRead: true,
      isCurrentUser: true,
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      content: "That's good to hear about the nausea. For the fatigue, try to space your activities throughout the day and get adequate rest.",
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-01-10T09:25:00'),
      isRead: true,
      isCurrentUser: false,
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      content: "Your next appointment is scheduled for March 12th at 9:00 AM. Please arrive 15 minutes early for blood work.",
      sender: 'Dr. Rebecca Martinez',
      senderAvatar: 'RM',
      timestamp: new Date('2025-01-10T10:23:00'),
      isRead: false,
      isCurrentUser: false,
      status: 'delivered',
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
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
      status: 'sent',
      type: 'text'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Update contact's last message
    const updatedContacts = contacts.map(contact => 
      contact.id === activeContact.id 
        ? { ...contact, lastMessage: newMessage, lastMessageTime: new Date() }
        : contact
    );
    setContacts(updatedContacts);
    
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

  const handleAttachment = (type: string) => {
    setShowAttachMenu(false);
    
    // Create attachment message based on type
    const attachmentMsg: Message = {
      id: Date.now().toString(),
      content: `${type} shared`,
      sender: 'You',
      senderAvatar: 'SP',
      timestamp: new Date(),
      isRead: true,
      isCurrentUser: true,
      status: 'sent',
      type: type.toLowerCase() as any
    };
    
    setMessages(prev => [...prev, attachmentMsg]);
    
    toast({
      title: `${type} Shared`,
      description: `${type} has been securely shared with ${activeContact.name}.`,
    });
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
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
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
        action={{
          label: 'New Message',
          icon: Plus,
          onClick: () => setShowNewMessageDialog(true)
        }}
      />
      
      <div className="flex h-[calc(100vh-12rem)] bg-background rounded-lg overflow-hidden border shadow-sm">
        {/* Contacts List */}
        <div className={`w-full md:w-1/3 border-r bg-white ${showMobileChat ? 'hidden md:block' : 'block'}`}>
          {/* Search Header */}
          <div className="p-4 border-b bg-gray-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-10 bg-white border-gray-200 rounded-xl h-11 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Contact List */}
          <ScrollArea className="flex-1">
            {contacts.map(contact => (
              <div
                key={contact.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                  activeContact.id === contact.id ? 'bg-blue-50 border-blue-100' : ''
                }`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium text-sm">
                      {contact.avatar}
                    </div>
                  </Avatar>
                  {contact.status === 'online' && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm truncate text-gray-900">{contact.name}</h4>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{formatDate(contact.lastMessageTime)}</span>
                  </div>
                  <p className="text-xs text-blue-600 mb-1 font-medium">{contact.role}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                    {contact.unreadCount > 0 && (
                      <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-green-500 text-white rounded-full text-xs ml-2 flex-shrink-0">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
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
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                  {activeContact?.avatar}
                </div>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{activeContact?.name}</h3>
                <p className="text-xs text-blue-600 font-medium">{activeContact?.role}</p>
                <p className="text-xs text-gray-500">{getLastSeenText(activeContact)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-full">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, i) => {
                const showDateHeader = i === 0 || 
                  new Date(messages[i-1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateHeader && (
                      <div className="flex justify-center my-6">
                        <Badge variant="secondary" className="bg-white shadow-sm text-xs px-3 py-1.5 border font-normal">
                          {new Date(message.timestamp).toLocaleDateString(undefined, { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </Badge>
                      </div>
                    )}
                    
                    <div className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] ${message.isCurrentUser ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                        <div className={`rounded-2xl py-3 px-4 max-w-full break-words shadow-sm ${
                          message.isCurrentUser 
                            ? 'bg-blue-500 text-white rounded-br-md' 
                            : 'bg-white border rounded-bl-md text-gray-900'
                        }`}>
                          {message.content}
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${
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
          <div className="p-4 border-t bg-white">
            <div className="flex items-end gap-2">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                
                {/* Attachment Menu */}
                {showAttachMenu && (
                  <div className="absolute bottom-14 left-0 bg-white border rounded-xl shadow-lg p-3 z-10 min-w-[280px]">
                    <div className="grid grid-cols-3 gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col items-center gap-2 h-20 hover:bg-gray-50"
                        onClick={() => handleAttachment('Document')}
                      >
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Paperclip className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-xs">Document</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col items-center gap-2 h-20 hover:bg-gray-50"
                        onClick={() => handleAttachment('Camera')}
                      >
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Camera className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="text-xs">Camera</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col items-center gap-2 h-20 hover:bg-gray-50"
                        onClick={() => handleAttachment('Gallery')}
                      >
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Image className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-xs">Gallery</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col items-center gap-2 h-20 hover:bg-gray-50"
                        onClick={() => handleAttachment('Voice Note')}
                      >
                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Mic className="h-5 w-5 text-red-600" />
                        </div>
                        <span className="text-xs">Voice</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col items-center gap-2 h-20 hover:bg-gray-50"
                        onClick={() => handleAttachment('Video')}
                      >
                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Video className="h-5 w-5 text-orange-600" />
                        </div>
                        <span className="text-xs">Video</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col items-center gap-2 h-20 hover:bg-gray-50"
                        onClick={() => handleAttachment('Location')}
                      >
                        <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">📍</span>
                        </div>
                        <span className="text-xs">Location</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 relative">
                <Input 
                  placeholder="Type a message..." 
                  className="pr-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white h-12 focus:ring-2 focus:ring-blue-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-400 hover:bg-gray-100 rounded-full"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                size="icon"
                className="rounded-full h-12 w-12 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* New Message Dialog */}
      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start New Conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Search medical staff</label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by name or role..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => {
                    setActiveContact(contact);
                    setShowNewMessageDialog(false);
                    setShowMobileChat(true);
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm">
                      {contact.avatar}
                    </div>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-blue-600">{contact.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Click outside to close attachment menu */}
      {showAttachMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowAttachMenu(false)}
        />
      )}
    </MainLayout>
  );
};

export default MessagingPage;
