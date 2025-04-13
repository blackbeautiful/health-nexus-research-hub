
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type PatientStatus = 'active' | 'pending' | 'completed';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  cancer: {
    type: string;
    stage: string;
  };
  status: PatientStatus;
  lastVisit: string;
  nextAppointment?: string;
}

const patients: Patient[] = [
  {
    id: "P-10045",
    name: "Maria Johnson",
    age: 54,
    gender: "Female",
    cancer: {
      type: "breast",
      stage: "Stage II"
    },
    status: "active",
    lastVisit: "2025-04-10",
    nextAppointment: "2025-04-17"
  },
  {
    id: "P-10046",
    name: "James Wilson",
    age: 67,
    gender: "Male",
    cancer: {
      type: "lung",
      stage: "Stage III"
    },
    status: "active",
    lastVisit: "2025-04-11",
    nextAppointment: "2025-04-18"
  },
  {
    id: "P-10047",
    name: "David Chen",
    age: 59,
    gender: "Male",
    cancer: {
      type: "prostate",
      stage: "Stage I"
    },
    status: "pending",
    lastVisit: "2025-04-09"
  },
  {
    id: "P-10048",
    name: "Sarah Miller",
    age: 42,
    gender: "Female",
    cancer: {
      type: "colorectal",
      stage: "Stage II"
    },
    status: "active",
    lastVisit: "2025-04-08",
    nextAppointment: "2025-04-22"
  },
  {
    id: "P-10049",
    name: "Robert Taylor",
    age: 71,
    gender: "Male",
    cancer: {
      type: "melanoma",
      stage: "Stage I"
    },
    status: "completed",
    lastVisit: "2025-04-05"
  }
];

const getCancerClass = (type: string): string => {
  const cancerTypes: Record<string, string> = {
    breast: "cancer-breast",
    lung: "cancer-lung",
    prostate: "cancer-prostate",
    colorectal: "cancer-colorectal",
    melanoma: "cancer-melanoma",
    leukemia: "cancer-leukemia",
    lymphoma: "cancer-lymphoma"
  };

  return cancerTypes[type] || "cancer-other";
};

const getStatusClass = (status: PatientStatus): string => {
  const statusClasses: Record<PatientStatus, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200"
  };

  return statusClasses[status];
};

const RecentPatients: React.FC = () => {
  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors border border-gray-100">
              <Avatar className="h-10 w-10">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700">
                  {patient.name.charAt(0)}
                </div>
              </Avatar>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-0.5">
                      <span className="mr-2">{patient.gender}, {patient.age}</span>
                      <span className="mr-2">•</span>
                      <span>ID: {patient.id}</span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className={cn("cancer-tag", getCancerClass(patient.cancer.type))}>
                    {patient.cancer.type.charAt(0).toUpperCase() + patient.cancer.type.slice(1)} • {patient.cancer.stage}
                  </Badge>
                </div>
              </div>
              
              <div className="ml-4 text-right">
                <Badge className={cn("font-medium capitalize", getStatusClass(patient.status))}>
                  {patient.status}
                </Badge>
                <div className="mt-1 flex justify-end items-center text-xs text-gray-500">
                  {patient.nextAppointment ? (
                    <>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Last: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPatients;
