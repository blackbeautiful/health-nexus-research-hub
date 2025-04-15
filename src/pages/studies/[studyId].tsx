import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Edit, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StudyQuiz } from '@/types/quiz';
import QuizList from '@/components/quiz/QuizList';

const QuizDetailsPage = () => {
  const { quizId } = useParams();
  
  // Mock quiz data - in real app this would come from an API call
  const quiz: StudyQuiz = {
    id: quizId || "1",
    title: "Initial Patient Assessment",
    description: "Weekly assessment for tracking patient symptoms and quality of life metrics",
    studyId: "BEACON-CRC",
    frequency: "weekly",
    questions: [
      {
        id: "q1",
        type: "single_choice",
        question: "How would you rate your overall quality of life this week?",
        options: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
        required: true
      },
      {
        id: "q2",
        type: "multiple_choice",
        question: "Which symptoms have you experienced in the past 7 days? (Select all that apply)",
        options: ["Fatigue", "Nausea", "Pain", "Headache", "Loss of appetite", "None of the above"],
        required: true
      },
      {
        id: "q3",
        type: "scale",
        question: "On a scale of 0-10, how severe was your pain today? (0 = no pain, 10 = worst pain imaginable)",
        required: false
      },
      {
        id: "q4",
        type: "text",
        question: "Please describe any other symptoms or concerns you have experienced:",
        required: false
      },
      {
        id: "q5",
        type: "true_false",
        question: "Have you taken all your prescribed medications as directed this week?",
        required: true
      }
    ],
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-10"),
    startDate: new Date("2025-04-15"),
    endDate: new Date("2026-04-15")
  };

  const getQuestionTypeLabel = (type: string) => {
    const labels: {[key: string]: string} = {
      'single_choice': 'Single Choice',
      'multiple_choice': 'Multiple Choice',
      'true_false': 'True/False',
      'text': 'Free Text',
      'scale': 'Scale (0-10)'
    };
    
    return labels[type] || type;
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/studies/quiz-management">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Quiz Management
          </Link>
        </Button>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/studies/quiz-management/${quizId}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Quiz
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Q{index + 1}</Badge>
                        <Badge>{getQuestionTypeLabel(question.type)}</Badge>
                        {question.required && (
                          <Badge variant="destructive">Required</Badge>
                        )}
                      </div>
                    </div>
                    <p className="font-medium mb-2">{question.question}</p>
                    {question.options && (
                      <div className="pl-4 mt-2">
                        <div className="text-sm text-muted-foreground mb-1">Options:</div>
                        <ul className="list-disc pl-5">
                          {question.options.map((option, i) => (
                            <li key={i} className="text-sm">{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Study ID</p>
                  <p className="font-medium">{quiz.studyId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Site ID</p>
                  <p className="font-medium">{quiz.siteId || "All sites"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="font-medium capitalize">{quiz.frequency}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{quiz.startDate.toLocaleDateString()}</p>
                </div>
                {quiz.endDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{quiz.endDate.toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="font-medium">{quiz.questions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Response Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Responses</span>
                  <span className="font-medium">284</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium text-green-600">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Time to Complete</span>
                  <span className="font-medium">3m 42s</span>
                </div>
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizDetailsPage;
