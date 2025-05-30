
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Heart, Thermometer, Wind, Droplets, Weight, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VitalSignsTabProps {
  patientId?: string;
}

const VitalSignsTab: React.FC<VitalSignsTabProps> = ({ patientId }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const vitalsData = [
    {
      date: '2025-01-15',
      time: '08:00',
      bloodPressure: { systolic: 125, diastolic: 78 },
      heartRate: 72,
      temperature: 98.6,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 168,
      pain: 2
    },
    {
      date: '2025-01-14',
      time: '08:00',
      bloodPressure: { systolic: 128, diastolic: 82 },
      heartRate: 75,
      temperature: 98.4,
      respiratoryRate: 18,
      oxygenSaturation: 97,
      weight: 168,
      pain: 3
    },
    {
      date: '2025-01-13',
      time: '08:00',
      bloodPressure: { systolic: 130, diastolic: 85 },
      heartRate: 78,
      temperature: 99.1,
      respiratoryRate: 20,
      oxygenSaturation: 96,
      weight: 167,
      pain: 4
    }
  ];

  const chartData = vitalsData.map(vital => ({
    date: vital.date,
    systolic: vital.bloodPressure.systolic,
    diastolic: vital.bloodPressure.diastolic,
    heartRate: vital.heartRate,
    temperature: vital.temperature,
    oxygenSat: vital.oxygenSaturation
  }));

  const getVitalStatus = (vital: string, value: number) => {
    const ranges = {
      systolic: { normal: [90, 120], high: [120, 140] },
      diastolic: { normal: [60, 80], high: [80, 90] },
      heartRate: { normal: [60, 100] },
      temperature: { normal: [97.8, 99.1] },
      respiratoryRate: { normal: [12, 20] },
      oxygenSaturation: { normal: [95, 100] }
    };

    const range = ranges[vital as keyof typeof ranges];
    if (!range) return 'normal';

    if (vital === 'oxygenSaturation') {
      return value >= range.normal[0] ? 'normal' : 'low';
    }

    if (range.high) {
      if (value < range.normal[0]) return 'low';
      if (value > range.high[1]) return 'high';
      if (value > range.normal[1]) return 'elevated';
    } else {
      if (value < range.normal[0] || value > range.normal[1]) return 'abnormal';
    }
    
    return 'normal';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      case 'elevated':
        return <Badge className="bg-yellow-100 text-yellow-800">Elevated</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      case 'abnormal':
        return <Badge className="bg-red-100 text-red-800">Abnormal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const latestVitals = vitalsData[0];

  return (
    <div className="space-y-6">
      {/* Current Vitals Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Pressure</p>
                <p className="text-lg font-semibold">
                  {latestVitals.bloodPressure.systolic}/{latestVitals.bloodPressure.diastolic}
                </p>
                {getStatusBadge(getVitalStatus('systolic', latestVitals.bloodPressure.systolic))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Heart Rate</p>
                <p className="text-lg font-semibold">{latestVitals.heartRate} bpm</p>
                {getStatusBadge(getVitalStatus('heartRate', latestVitals.heartRate))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-100">
                <Thermometer className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-lg font-semibold">{latestVitals.temperature}°F</p>
                {getStatusBadge(getVitalStatus('temperature', latestVitals.temperature))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Droplets className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">O2 Saturation</p>
                <p className="text-lg font-semibold">{latestVitals.oxygenSaturation}%</p>
                {getStatusBadge(getVitalStatus('oxygenSaturation', latestVitals.oxygenSaturation))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Vital Signs Trends</CardTitle>
              <CardDescription>Track vital signs over time</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeframe('day')}>
                Day
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeframe('week')}>
                Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeframe('month')}>
                Month
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Systolic BP" />
              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic BP" />
              <Line type="monotone" dataKey="heartRate" stroke="#10b981" strokeWidth={2} name="Heart Rate" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Vitals History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Vitals History</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Vitals
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vitalsData.map((vital, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{vital.date} at {vital.time}</h4>
                    <p className="text-sm text-muted-foreground">Recorded by nursing staff</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">BP:</span>
                    <span className="ml-2 font-medium">
                      {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic} mmHg
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">HR:</span>
                    <span className="ml-2 font-medium">{vital.heartRate} bpm</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Temp:</span>
                    <span className="ml-2 font-medium">{vital.temperature}°F</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">O2 Sat:</span>
                    <span className="ml-2 font-medium">{vital.oxygenSaturation}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RR:</span>
                    <span className="ml-2 font-medium">{vital.respiratoryRate}/min</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-2 font-medium">{vital.weight} lbs</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pain:</span>
                    <span className="ml-2 font-medium">{vital.pain}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalSignsTab;
