
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    patients: 45,
    studies: 3,
    specimens: 67,
  },
  {
    name: 'Feb',
    patients: 52,
    studies: 4,
    specimens: 85,
  },
  {
    name: 'Mar',
    patients: 61,
    studies: 4,
    specimens: 93,
  },
  {
    name: 'Apr',
    patients: 58,
    studies: 5,
    specimens: 102,
  },
  {
    name: 'May',
    patients: 65,
    studies: 5,
    specimens: 110,
  },
  {
    name: 'Jun',
    patients: 74,
    studies: 6,
    specimens: 128,
  },
];

const ResearchMetricsChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Research Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              contentStyle={{ 
                borderRadius: '4px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '15px', 
                fontSize: '12px' 
              }}
            />
            <Bar 
              dataKey="patients" 
              name="Patients Enrolled" 
              fill="#0EA5E9" 
              radius={[4, 4, 0, 0]}
              barSize={12} 
            />
            <Bar 
              dataKey="studies" 
              name="Active Studies" 
              fill="#7DD3FC" 
              radius={[4, 4, 0, 0]}
              barSize={12} 
            />
            <Bar 
              dataKey="specimens" 
              name="Specimens Collected" 
              fill="#0284C7" 
              radius={[4, 4, 0, 0]}
              barSize={12} 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ResearchMetricsChart;
