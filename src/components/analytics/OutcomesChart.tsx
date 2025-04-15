
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface OutcomeDataItem {
  name: string;
  value: number;
  color: string;
}

export interface OutcomesChartProps {
  data: {
    byGroup?: {
      name: string;
      success: number;
      partial: number;
      failure: number;
    }[];
    adverseEvents?: {
      severity: string;
      count: number;
    }[];
  };
  title?: string;
  description?: string;
}

const OutcomesChart: React.FC<OutcomesChartProps> = ({ 
  data, 
  title = "Treatment Outcomes", 
  description = "Distribution by response" 
}) => {
  // Transform the data into the format required by PieChart
  const transformedData = data.byGroup?.map(group => [
    { name: `${group.name} Success`, value: group.success, color: '#10B981' },
    { name: `${group.name} Partial`, value: group.partial, color: '#F59E0B' },
    { name: `${group.name} Failure`, value: group.failure, color: '#EF4444' }
  ]).flat() || [];

  // Transform adverse events if they exist
  const adverseEventsData = data.adverseEvents?.map(event => ({
    name: event.severity,
    value: event.count,
    color: event.severity === 'Mild' ? '#10B981' : 
           event.severity === 'Moderate' ? '#F59E0B' : 
           event.severity === 'Severe' ? '#EF4444' : 
           event.severity === 'Life-threatening' ? '#7F1D1D' : '#3B82F6'
  })) || [];

  // Use transformed data or adverse events based on what's available
  const chartData = transformedData.length > 0 ? transformedData : adverseEventsData;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OutcomesChart;
