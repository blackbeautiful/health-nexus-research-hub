
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Calendar, Activity, Dna, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PatientProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  cancerType: string;
  stage: string;
  physician: string;
  status: string;
  diagnosisDate: string;
}

interface PatientCardProps {
  patient: PatientProps;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  // Calculate different colors for different statuses
  const statusColor = {
    'active': 'bg-blue-500',
    'remission': 'bg-green-500',
    'critical': 'bg-red-500'
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <div className="flex h-full w-full items-center justify-center bg-primary text-white">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
            </Avatar>
            <div>
              <CardTitle className="text-base">{patient.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{patient.age} yrs, {patient.gender}</span>
                <span>•</span>
                <span>{patient.id}</span>
              </div>
            </div>
          </div>
          <Badge className={`${statusColor[patient.status as keyof typeof statusColor]} text-white`}>
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Cancer Type</p>
            <p className="font-medium">
              <Badge className={`cancer-${patient.cancerType.toLowerCase().replace(' ', '')}`}>
                {patient.cancerType}
              </Badge>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Stage</p>
            <p className="font-medium">{patient.stage}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Oncologist</p>
            <p className="font-medium">Dr. {patient.physician}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Diagnosis Date</p>
            <p className="font-medium">{patient.diagnosisDate}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 border-t pt-3">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/patients/${patient.id}`}>
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/patients/${patient.id}?tab=treatment`}>
            Treatment Plan
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
