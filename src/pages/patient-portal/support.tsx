
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, Phone, Mail, Search, Send } from 'lucide-react';

const PatientPortalSupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'technical',
    message: ''
  });

  const faqs = [
    {
      question: 'How do I reset my patient portal password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password.'
    },
    {
      question: 'How do I view my lab results?',
      answer: 'Log into your patient portal and navigate to the "Lab Results" section. Your most recent results will be displayed there, and you can download or print them as needed.'
    },
    {
      question: 'Can I schedule appointments through the portal?',
      answer: 'Yes, you can schedule, reschedule, or cancel appointments through the "Appointments" section of your patient portal.'
    },
    {
      question: 'How do I update my contact information?',
      answer: 'Go to your "Profile" section in the patient portal where you can update your address, phone number, and emergency contacts.'
    }
  ];

  const supportTickets = [
    {
      id: 'T001',
      subject: 'Cannot access lab results',
      status: 'Open',
      category: 'Technical',
      created: '2025-01-15',
      lastUpdate: '2025-01-15'
    },
    {
      id: 'T002',
      subject: 'Billing question',
      status: 'Resolved',
      category: 'Billing',
      created: '2025-01-14',
      lastUpdate: '2025-01-14'
    }
  ];

  const handleSubmitTicket = () => {
    console.log('Submitting support ticket:', ticketForm);
    setTicketForm({ subject: '', category: 'technical', message: '' });
  };

  const getStatusBadge = (status: string) => {
    return status === 'Open' ? 
      <Badge variant="destructive">Open</Badge> : 
      <Badge variant="secondary">Resolved</Badge>;
  };

  return (
    <Layout title="Patient Portal Support">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Patient Portal Support</h1>
          <p className="text-muted-foreground">Get help with your patient portal and healthcare questions</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">Call Support</h3>
              <p className="text-sm text-muted-foreground">(555) 123-HELP</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground">support@hospital.com</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </CardContent>
          </Card>
        </div>

        {/* Support Tabs */}
        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Support Tickets</CardTitle>
                <CardDescription>Track your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-sm text-muted-foreground">
                          #{ticket.id} | {ticket.category} | Created: {ticket.created}
                        </div>
                      </div>
                      {getStatusBadge(ticket.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Submit a new support request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Support Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientPortalSupportPage;
