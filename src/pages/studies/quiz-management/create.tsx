
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const CreateQuizPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/studies/quiz-management">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Quiz Management
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create New Quiz</h1>
        <p className="text-muted-foreground">Create a new quiz for your study or site</p>
      </div>
      
      <div className="max-w-2xl">
        {/* Quiz creation form will be implemented in the next iteration */}
        <div className="text-center py-12">
          <p className="text-muted-foreground">Quiz creation form coming soon...</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateQuizPage;
