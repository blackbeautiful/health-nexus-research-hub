
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuizList from '@/components/quiz/QuizList';

const QuizManagementPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quiz Management</h1>
          <p className="text-muted-foreground">Manage patient quizzes for studies and sites</p>
        </div>
        <Button asChild>
          <Link to="/studies/quiz-management/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Quiz
          </Link>
        </Button>
      </div>
      <QuizList />
    </MainLayout>
  );
};

export default QuizManagementPage;
