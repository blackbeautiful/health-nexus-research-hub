
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

// Enhanced mock data with more comprehensive information
const mockQuizzes = [
  {
    id: '1',
    title: 'Initial Patient Assessment',
    studyId: 'BEACON-CRC',
    frequency: 'weekly',
    questionsCount: 10,
    nextDue: '2025-04-22',
    completionRate: 85,
    assignedPatients: 32,
    completedPatients: 27,
    description: 'Standardized assessment for all patients entering the BEACON-CRC trial',
    status: 'active'
  },
  {
    id: '2',
    title: 'Quality of Life Survey',
    studyId: 'BEACON-CRC',
    frequency: 'monthly',
    questionsCount: 15,
    nextDue: '2025-05-01',
    completionRate: 92,
    assignedPatients: 32,
    completedPatients: 29,
    description: 'Assessment of patient-reported outcomes for quality of life metrics',
    status: 'active'
  },
  {
    id: '3',
    title: 'Side Effect Reporting',
    studyId: 'ONCO-2025-001',
    frequency: 'weekly',
    questionsCount: 8,
    nextDue: '2025-04-20',
    completionRate: 76,
    assignedPatients: 48,
    completedPatients: 37,
    description: 'Monitoring of treatment side effects and adverse events',
    status: 'active'
  },
  {
    id: '4',
    title: 'Follow-up Assessment',
    studyId: 'ONCO-2024-001',
    frequency: 'quarterly',
    questionsCount: 20,
    nextDue: '2025-06-15',
    completionRate: 65,
    assignedPatients: 18,
    completedPatients: 12,
    description: 'Comprehensive follow-up for patients 3 months post-treatment',
    status: 'draft'
  },
];

const QuizList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockQuizzes.map((quiz) => (
        <Card key={quiz.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <Badge variant={quiz.status === 'active' ? 'default' : 'outline'}>
                {quiz.status === 'active' ? 'Active' : 'Draft'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{quiz.studyId}</Badge>
              <Badge variant="secondary">
                <Clock className="mr-1 h-3 w-3" />
                {quiz.frequency}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{quiz.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Questions</span>
                <span className="font-medium">{quiz.questionsCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Next due
                </span>
                <span className="font-medium">{quiz.nextDue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Patient completion
                </span>
                <span className="font-medium">{quiz.completedPatients}/{quiz.assignedPatients}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span>Completion rate</span>
                  <span className={`font-medium ${quiz.completionRate >= 80 ? 'text-green-600' : quiz.completionRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                    {quiz.completionRate}%
                  </span>
                </div>
                <Progress 
                  value={quiz.completionRate} 
                  className="h-2" 
                  indicatorClassName={quiz.completionRate >= 80 ? 'bg-green-600' : quiz.completionRate >= 60 ? 'bg-amber-600' : 'bg-red-600'} 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link to={`/studies/quiz-management/${quiz.id}`} className="flex items-center justify-center">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default QuizList;
