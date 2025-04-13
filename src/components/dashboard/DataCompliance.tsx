
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, FileLock, AlertCircle } from 'lucide-react';

interface ComplianceMetric {
  name: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

const complianceData: ComplianceMetric[] = [
  {
    name: 'Data Encryption',
    percentage: 100,
    color: 'bg-green-500',
    icon: <Shield className="h-4 w-4" />
  },
  {
    name: 'HIPAA Compliance',
    percentage: 98,
    color: 'bg-green-500',
    icon: <FileLock className="h-4 w-4" />
  },
  {
    name: 'Consent Validation',
    percentage: 94,
    color: 'bg-yellow-500',
    icon: <AlertCircle className="h-4 w-4" />
  },
  {
    name: 'Audit Trail Completion',
    percentage: 100,
    color: 'bg-green-500',
    icon: <Shield className="h-4 w-4" />
  }
];

const DataCompliance: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Data Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceData.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`p-1.5 rounded-full ${metric.percentage >= 95 ? 'bg-green-100' : 'bg-yellow-100'} mr-2`}>
                    {React.cloneElement(metric.icon as React.ReactElement, { 
                      className: `h-4 w-4 ${metric.percentage >= 95 ? 'text-green-600' : 'text-yellow-600'}`
                    })}
                  </div>
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <span className="text-sm font-medium">{metric.percentage}%</span>
              </div>
              <Progress
                value={metric.percentage}
                className="h-1.5"
                indicatorClassName={metric.color}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-start text-sm">
            <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div>
              <p className="font-medium">All systems are HIPAA compliant</p>
              <p className="mt-0.5 text-green-700">Last security audit passed on April 10, 2025</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCompliance;
