
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OutcomeDataItem {
  name: string;
  value: number;
  color: string;
}

interface OutcomesChartProps {
  data: OutcomeDataItem[];
  title?: string;
  description?: string;
}

const OutcomesChart: React.FC<OutcomesChartProps> = ({ 
  data, 
  title = "Treatment Outcomes", 
  description = "Distribution by response" 
}) => {
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
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
