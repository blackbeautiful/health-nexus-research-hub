
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

interface StudySiteCardProps {
  site: {
    id: string;
    name: string;
    location: string;
    status: 'active' | 'pending' | 'closed';
    principalInvestigator: string;
    contactPhone: string;
    enrollmentTarget: number;
    currentEnrollment: number;
    startDate: string;
    lastVisit?: string;
    nextVisit?: string;
  };
}

const StudySiteCard: React.FC<StudySiteCardProps> = ({ site }) => {
  const enrollmentPercentage = Math.round((site.currentEnrollment / site.enrollmentTarget) * 100);
  
  const statusVariant = {
    active: 'default',
    pending: 'outline',
    closed: 'secondary'
  }[site.status];
  
  const statusLabel = {
    active: 'Active',
    pending: 'Pending',
    closed: 'Closed'
  }[site.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{site.name}</CardTitle>
          <Badge variant={statusVariant as any}>{statusLabel}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{site.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium flex items-center mb-1">
            <Users className="h-4 w-4 mr-1" />
            Principal Investigator
          </p>
          <p className="text-sm">{site.principalInvestigator}</p>
          <p className="text-sm flex items-center mt-1">
            <Phone className="h-3.5 w-3.5 mr-1" />
            {site.contactPhone}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Enrollment Progress</span>
            <span className="font-medium">{site.currentEnrollment}/{site.enrollmentTarget}</span>
          </div>
          <Progress value={enrollmentPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Start Date
            </p>
            <p className="text-sm font-medium">{site.startDate}</p>
          </div>
          {site.lastVisit && (
            <div>
              <p className="text-xs text-muted-foreground">Last Site Visit</p>
              <p className="text-sm font-medium">{site.lastVisit}</p>
            </div>
          )}
          {site.nextVisit && (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Next Scheduled Visit</p>
              <p className="text-sm font-medium">{site.nextVisit}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/studies/sites/${site.id}`} className="flex items-center justify-center">
            View Site Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudySiteCard;
