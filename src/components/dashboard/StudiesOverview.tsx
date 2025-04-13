
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarClock, Users } from 'lucide-react';

interface Study {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  cancerFocus: string;
  enrollment: number;
  target: number;
  deadline: string;
  principal: string;
}

const studies: Study[] = [
  {
    id: "S-001",
    name: "Advanced Breast Cancer Treatment Response",
    status: "active",
    cancerFocus: "breast",
    enrollment: 37,
    target: 50,
    deadline: "2025-07-15",
    principal: "Dr. Sarah Chen"
  },
  {
    id: "S-002",
    name: "Early Detection of Lung Cancer",
    status: "active",
    cancerFocus: "lung",
    enrollment: 45,
    target: 100,
    deadline: "2025-08-22",
    principal: "Dr. James Wilson"
  },
  {
    id: "S-003",
    name: "Immunotherapy for Melanoma",
    status: "pending",
    cancerFocus: "melanoma",
    enrollment: 0,
    target: 75,
    deadline: "2025-09-10",
    principal: "Dr. Robert Taylor"
  }
];

const getProgressColor = (percent: number): string => {
  if (percent >= 75) return "bg-green-600";
  if (percent >= 50) return "bg-blue-600";
  if (percent >= 25) return "bg-yellow-500";
  return "bg-red-500";
};

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

const getStatusClass = (status: Study['status']): string => {
  const statusClasses: Record<Study['status'], string> = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  return statusClasses[status];
};

const StudiesOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Active Studies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studies.map((study) => {
            const percentComplete = Math.round((study.enrollment / study.target) * 100);
            
            return (
              <div key={study.id} className="border border-gray-100 rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{study.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getCancerClass(study.cancerFocus)}>
                        {study.cancerFocus.charAt(0).toUpperCase() + study.cancerFocus.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getStatusClass(study.status)}>
                        {study.status.charAt(0).toUpperCase() + study.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{study.id}</span>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span className="text-gray-600">
                        {study.enrollment} of {study.target} participants
                      </span>
                    </div>
                    <span className="font-medium">{percentComplete}%</span>
                  </div>
                  <Progress 
                    value={percentComplete} 
                    className="h-2"
                    indicatorClassName={getProgressColor(percentComplete)}
                  />
                </div>
                
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <CalendarClock className="h-3.5 w-3.5 mr-1" />
                    <span>Deadline: {new Date(study.deadline).toLocaleDateString()}</span>
                  </div>
                  <span>PI: {study.principal}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudiesOverview;
