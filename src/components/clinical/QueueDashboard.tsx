
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, AlertTriangle, Activity, Stethoscope } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  mrn: string;
  checkInTime: string;
  triageLevel: number;
  currentStage: string;
  provider: string;
  room?: string;
  waitTime: number;
  nextAction: string;
}

interface QueueDashboardProps {
  onPatientSelect?: (patientId: string) => void;
}

const QueueDashboard: React.FC<QueueDashboardProps> = ({ onPatientSelect }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const patients: Patient[] = [
    {
      id: 'PT001',
      name: 'Sarah Johnson',
      mrn: '12345',
      checkInTime: '09:15 AM',
      triageLevel: 2,
      currentStage: 'waiting-vitals',
      provider: 'Dr. Martinez',
      waitTime: 25,
      nextAction: 'Vitals needed'
    },
    {
      id: 'PT002',
      name: 'Michael Smith',
      mrn: '12346',
      checkInTime: '09:30 AM',
      triageLevel: 3,
      currentStage: 'with-provider',
      provider: 'Dr. Wilson',
      room: 'Room 3',
      waitTime: 45,
      nextAction: 'In consultation'
    },
    {
      id: 'PT003',
      name: 'Emma Thompson',
      mrn: '12347',
      checkInTime: '09:45 AM',
      triageLevel: 1,
      currentStage: 'urgent-care',
      provider: 'Dr. Rodriguez',
      room: 'Room 1',
      waitTime: 5,
      nextAction: 'URGENT - Immediate attention'
    },
    {
      id: 'PT004',
      name: 'John Davis',
      mrn: '12348',
      checkInTime: '10:00 AM',
      triageLevel: 4,
      currentStage: 'waiting-room',
      provider: 'Dr. Kim',
      waitTime: 15,
      nextAction: 'Waiting for room'
    }
  ];

  const getTriageBadge = (level: number) => {
    const colors = {
      1: 'bg-red-500 text-white',
      2: 'bg-orange-500 text-white',
      3: 'bg-yellow-500 text-white',
      4: 'bg-green-500 text-white',
      5: 'bg-blue-500 text-white'
    };
    return <Badge className={colors[level as keyof typeof colors]}>Level {level}</Badge>;
  };

  const getStageBadge = (stage: string) => {
    const stageMap = {
      'waiting-room': { label: 'Waiting Room', color: 'bg-blue-100 text-blue-800' },
      'waiting-vitals': { label: 'Needs Vitals', color: 'bg-yellow-100 text-yellow-800' },
      'with-provider': { label: 'With Provider', color: 'bg-green-100 text-green-800' },
      'urgent-care': { label: 'URGENT', color: 'bg-red-100 text-red-800' },
      'lab-work': { label: 'Lab Work', color: 'bg-purple-100 text-purple-800' },
      'checkout': { label: 'Ready for Checkout', color: 'bg-gray-100 text-gray-800' }
    };
    
    const stageInfo = stageMap[stage as keyof typeof stageMap];
    return <Badge className={stageInfo?.color}>{stageInfo?.label}</Badge>;
  };

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime > 60) return 'text-red-600';
    if (waitTime > 30) return 'text-orange-600';
    return 'text-green-600';
  };

  const filteredPatients = patients.filter(patient => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'urgent') return patient.triageLevel <= 2;
    if (selectedFilter === 'waiting') return patient.currentStage.includes('waiting');
    if (selectedFilter === 'with-provider') return patient.currentStage === 'with-provider';
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Patient Queue Dashboard
          </CardTitle>
          <CardDescription>Real-time patient flow and status tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button 
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              size="sm"
            >
              All Patients ({patients.length})
            </Button>
            <Button 
              variant={selectedFilter === 'urgent' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('urgent')}
              size="sm"
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Urgent ({patients.filter(p => p.triageLevel <= 2).length})
            </Button>
            <Button 
              variant={selectedFilter === 'waiting' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('waiting')}
              size="sm"
            >
              Waiting ({patients.filter(p => p.currentStage.includes('waiting')).length})
            </Button>
            <Button 
              variant={selectedFilter === 'with-provider' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('with-provider')}
              size="sm"
            >
              <Stethoscope className="h-4 w-4 mr-1" />
              In Progress ({patients.filter(p => p.currentStage === 'with-provider').length})
            </Button>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <Card 
                key={patient.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  patient.triageLevel <= 2 ? 'border-l-4 border-l-red-500' : ''
                }`}
                onClick={() => onPatientSelect?.(patient.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <h3 className="font-semibold">{patient.name}</h3>
                        <span className="text-sm text-muted-foreground">MRN: {patient.mrn}</span>
                        {getTriageBadge(patient.triageLevel)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Check-in: {patient.checkInTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className={`h-3 w-3 ${getWaitTimeColor(patient.waitTime)}`} />
                          <span className={getWaitTimeColor(patient.waitTime)}>
                            Wait: {patient.waitTime} min
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Provider: </span>
                          {patient.provider}
                        </div>
                        {patient.room && (
                          <div>
                            <span className="text-muted-foreground">Location: </span>
                            {patient.room}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {getStageBadge(patient.currentStage)}
                      <span className="text-xs text-muted-foreground">{patient.nextAction}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-muted-foreground">Total Patients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {patients.filter(p => p.triageLevel <= 2).length}
            </div>
            <div className="text-sm text-muted-foreground">Urgent Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(patients.reduce((sum, p) => sum + p.waitTime, 0) / patients.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Wait (min)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.currentStage === 'with-provider').length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueueDashboard;
