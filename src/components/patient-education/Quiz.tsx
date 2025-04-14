
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

interface QuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

const Quiz = ({ title, description, questions, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (value: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: parseInt(value)
    });
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      let finalScore = 0;
      questions.forEach(question => {
        if (selectedOptions[question.id] === question.correctAnswer) {
          finalScore++;
        }
      });
      setScore(finalScore);
      setQuizCompleted(true);
      
      if (onComplete) {
        onComplete(finalScore, questions.length);
      }
      
      toast({
        title: "Quiz Completed",
        description: `You scored ${finalScore} out of ${questions.length} questions.`,
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setShowAnswer(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const isAnswered = currentQuestion && selectedOptions[currentQuestion.id] !== undefined;
  const isCorrect = currentQuestion && selectedOptions[currentQuestion.id] === currentQuestion.correctAnswer;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            
            <RadioGroup 
              onValueChange={handleOptionSelect} 
              value={selectedOptions[currentQuestion.id]?.toString()} 
              disabled={showAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className={`
                  flex items-center space-x-2 rounded-md border p-3
                  ${showAnswer && index === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                  ${showAnswer && index === selectedOptions[currentQuestion.id] && index !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-50' : ''}
                `}>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1">{option}</Label>
                  
                  {showAnswer && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showAnswer && index === selectedOptions[currentQuestion.id] && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </RadioGroup>
            
            {showAnswer && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Explanation:</p>
                    <p className="text-sm">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-muted-foreground">You scored {score} out of {questions.length} questions.</p>
              
              <div className="my-6">
                <div className="text-5xl font-bold mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <Progress 
                  value={(score / questions.length) * 100} 
                  className="h-3"
                  indicatorClassName={`${score / questions.length >= 0.7 ? 'bg-green-500' : 'bg-amber-500'}`}
                />
              </div>
              
              {score / questions.length >= 0.7 ? (
                <p className="text-green-600 font-medium">Great job! You've demonstrated a good understanding of this topic.</p>
              ) : (
                <p className="text-amber-600 font-medium">You might want to review this topic again for better understanding.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!quizCompleted ? (
          !showAnswer ? (
            <Button 
              onClick={handleCheckAnswer} 
              disabled={!isAnswered}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          )
        ) : (
          <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
