
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Calendar } from 'lucide-react';

interface Study {
  id: string;
  title: string;
  phase: string;
  status: 'active' | 'pending' | 'completed';
  patients: {
    enrolled: number;
    target: number;
  };
  startDate: string;
  endDate: string;
  progress: number;
}

const studies: Study[] = [
  {
    id: "ST-2025-001",
    title: "Novel Immunotherapy for Triple-Negative Breast Cancer",
    phase: "Phase II",
    status: "active",
    patients: {
      enrolled: 67,
      target: 120
    },
    startDate: "2025-01-15",
    endDate: "2026-07-30",
    progress: 56
  },
  {
    id: "ST-2025-002",
    title: "PARP Inhibitor in Metastatic Prostate Cancer",
    phase: "Phase I",
    status: "active",
    patients: {
      enrolled: 24,
      target: 40
    },
    startDate: "2025-02-10",
    endDate: "2025-12-15",
    progress: 60
  },
  {
    id: "ST-2025-003",
    title: "Biomarker Study for Early Detection of Lung Cancer",
    phase: "Phase III",
    status: "pending",
    patients: {
      enrolled: 156,
      target: 500
    },
    startDate: "2025-03-01",
    endDate: "2026-09-30",
    progress: 31
  }
];

const getStatusClass = (status: string): string => {
  const statusClasses: Record<string, string> = {
    active: "bg-green-50 text-green-700 hover:bg-green-100",
    pending: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
    completed: "bg-blue-50 text-blue-700 hover:bg-blue-100"
  };

  return statusClasses[status] || "";
};

const StudiesOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Ongoing Studies</CardTitle>
        <CardDescription>Monitor enrollment and progress across all active clinical trials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {studies.map((study) => (
            <div key={study.id} className="rounded-lg border border-border p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{study.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                    <span>{study.phase}</span>
                    <span>•</span>
                    <span>ID: {study.id}</span>
                  </div>
                </div>
                <Badge className={getStatusClass(study.status)}>
                  {study.status.charAt(0).toUpperCase() + study.status.slice(1)}
                </Badge>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Patient Enrollment</span>
                  <span className="font-medium">{study.patients.enrolled}/{study.patients.target}</span>
                </div>
                <Progress value={study.progress} className="h-1.5" indicatorClassName="bg-health-primary" />
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(study.startDate).toLocaleDateString()} - {new Date(study.endDate).toLocaleDateString()}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudiesOverview;
