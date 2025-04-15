
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface EnrollmentData {
  month: string;
  count?: number;
  patients?: number;
  enrolled?: number;
  completed?: number;
}

export interface EnrollmentMetricsProps {
  data: {
    overview?: {
      totalPatients: number;
      activePatientsCount: number;
      completedPatientsCount: number;
      withdrawnPatientsCount: number;
      screeningFailureCount: number;
    };
    byStudy?: {
      name: string;
      total: number;
      active: number;
      completed: number;
      withdrawn: number;
      screeningFailure: number;
    }[];
    enrollmentTrend: EnrollmentData[];
  };
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

const EnrollmentMetrics: React.FC<EnrollmentMetricsProps> = ({ 
  data, 
  timeRange = 'year',
  onTimeRangeChange 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">Enrollment Metrics</CardTitle>
          <CardDescription>Monthly patient recruitment</CardDescription>
        </div>
        <Select 
          value={timeRange} 
          onValueChange={onTimeRangeChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data.enrollmentTrend}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" name="Patients Screened" fill="#8b5cf6" />
            <Bar dataKey="enrolled" name="Patients Enrolled" fill="#c084fc" />
            <Bar dataKey="completed" name="Study Completed" fill="#d8b4fe" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EnrollmentMetrics;
