
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - in a real app, this would come from your backend
const mockQuizzes = [
  {
    id: '1',
    title: 'Initial Patient Assessment',
    studyId: 'BEACON-CRC',
    frequency: 'weekly',
    questionsCount: 10,
    nextDue: '2025-04-22',
    completionRate: 85,
  },
  {
    id: '2',
    title: 'Quality of Life Survey',
    studyId: 'BEACON-CRC',
    frequency: 'monthly',
    questionsCount: 15,
    nextDue: '2025-05-01',
    completionRate: 92,
  },
];

const QuizList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockQuizzes.map((quiz) => (
        <Link key={quiz.id} to={`/studies/quiz-management/${quiz.id}`}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{quiz.studyId}</Badge>
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {quiz.frequency}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
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
                  <span>Completion rate</span>
                  <span className="font-medium text-green-600">{quiz.completionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default QuizList;
