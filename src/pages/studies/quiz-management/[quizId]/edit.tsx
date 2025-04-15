
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { StudyQuiz, QuizQuestion, QuestionType, QuizFrequency } from '@/types/quiz';
import { useToast } from '@/hooks/use-toast';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const { toast } = useToast();
  
  // Mock quiz data - in real app this would come from an API call
  const [quiz, setQuiz] = useState<StudyQuiz>({
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
  });

  const updateQuizField = (field: keyof StudyQuiz, value: any) => {
    setQuiz(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value
    };
    setQuiz(prev => ({
      ...prev,
      questions: newQuestions
    }));
  };

  const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...quiz.questions];
    if (newQuestions[questionIndex].options) {
      const newOptions = [...(newQuestions[questionIndex].options || [])];
      newOptions[optionIndex] = value;
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newOptions
      };
      setQuiz(prev => ({
        ...prev,
        questions: newQuestions
      }));
    }
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...quiz.questions];
    if (newQuestions[questionIndex].options) {
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: [...(newQuestions[questionIndex].options || []), "New option"]
      };
      setQuiz(prev => ({
        ...prev,
        questions: newQuestions
      }));
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...quiz.questions];
    if (newQuestions[questionIndex].options) {
      const newOptions = [...(newQuestions[questionIndex].options || [])];
      newOptions.splice(optionIndex, 1);
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newOptions
      };
      setQuiz(prev => ({
        ...prev,
        questions: newQuestions
      }));
    }
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q${quiz.questions.length + 1}`,
      type: "single_choice",
      question: "",
      options: ["Option 1"],
      required: false
    };
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(index, 1);
    setQuiz(prev => ({
      ...prev,
      questions: newQuestions
    }));
  };

  const handleChangeQuestionType = (index: number, type: QuestionType) => {
    const newQuestions = [...quiz.questions];
    // Initialize appropriate default values based on question type
    let updatedQuestion = { ...newQuestions[index], type };
    
    if (type === 'multiple_choice' || type === 'single_choice') {
      updatedQuestion.options = updatedQuestion.options || ["Option 1"];
    } else if (type === 'true_false') {
      delete updatedQuestion.options;
    } else if (type === 'text' || type === 'scale') {
      delete updatedQuestion.options;
    }
    
    newQuestions[index] = updatedQuestion;
    setQuiz(prev => ({
      ...prev,
      questions: newQuestions
    }));
  };

  const handleSaveQuiz = () => {
    // In a real app, this would make an API call
    toast({
      title: "Quiz saved",
      description: "Your quiz has been successfully updated"
    });
    // Here you would redirect to the quiz details page or do other actions
  };

  const frequencyOptions: QuizFrequency[] = [
    'hourly', 'daily', 'weekly', 'fortnightly', 'monthly', 'yearly', 'custom'
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to={`/studies/quiz-management/${quizId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Quiz Details
          </Link>
        </Button>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Edit Quiz</h1>
            <p className="text-muted-foreground">Update quiz details and questions</p>
          </div>
          <Button onClick={handleSaveQuiz}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold">Basic Information</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input 
                    id="title" 
                    value={quiz.title} 
                    onChange={e => updateQuizField('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={quiz.description || ''} 
                    onChange={e => updateQuizField('description', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studyId">Study ID</Label>
                    <Input 
                      id="studyId" 
                      value={quiz.studyId} 
                      onChange={e => updateQuizField('studyId', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteId">Site ID (Optional)</Label>
                    <Input 
                      id="siteId" 
                      value={quiz.siteId || ''} 
                      onChange={e => updateQuizField('siteId', e.target.value)}
                      placeholder="Leave empty for all sites"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select 
                      value={quiz.frequency} 
                      onValueChange={value => updateQuizField('frequency', value as QuizFrequency)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map(option => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {quiz.frequency === 'custom' && (
                    <div>
                      <Label htmlFor="customDays">Custom Days</Label>
                      <Input 
                        id="customDays" 
                        type="number" 
                        min="1"
                        value={quiz.customFrequencyDays || 1} 
                        onChange={e => updateQuizField('customFrequencyDays', parseInt(e.target.value))}
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="date" 
                      value={quiz.startDate.toISOString().split('T')[0]} 
                      onChange={e => updateQuizField('startDate', new Date(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input 
                      id="endDate" 
                      type="date" 
                      value={quiz.endDate ? quiz.endDate.toISOString().split('T')[0] : ''} 
                      onChange={e => updateQuizField('endDate', e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Questions</h2>
              <Button onClick={addQuestion} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Question
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeQuestion(index)}
                        disabled={quiz.questions.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Question Type</Label>
                          <Select 
                            value={question.type} 
                            onValueChange={(value) => handleChangeQuestionType(index, value as QuestionType)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single_choice">Single Choice</SelectItem>
                              <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                              <SelectItem value="true_false">True/False</SelectItem>
                              <SelectItem value="text">Free Text</SelectItem>
                              <SelectItem value="scale">Scale (0-10)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`required-${index}`}
                            checked={question.required} 
                            onCheckedChange={(checked) => updateQuestion(index, 'required', checked)}
                          />
                          <Label htmlFor={`required-${index}`}>Required question</Label>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Question Text</Label>
                        <Textarea 
                          value={question.question} 
                          onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                          placeholder="Enter your question here"
                        />
                      </div>
                      
                      {(question.type === 'single_choice' || question.type === 'multiple_choice') && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Answer Options</Label>
                            <Button 
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(index)}
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add Option
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <Input 
                                  value={option} 
                                  onChange={(e) => updateQuestionOption(index, optionIndex, e.target.value)}
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                <Button 
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(index, optionIndex)}
                                  disabled={(question.options?.length || 0) <= 1}
                                >
                                  <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Quiz Preview</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This is a preview of how your quiz will appear to patients.
              </p>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">{quiz.title}</h3>
                {quiz.description && (
                  <p className="text-muted-foreground mb-6">{quiz.description}</p>
                )}
                
                <div className="space-y-6">
                  {quiz.questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <p className="font-medium">
                        {index + 1}. {question.question}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </p>
                      
                      {question.type === 'single_choice' && question.options && (
                        <div className="pl-5 space-y-1">
                          {question.options.map((option, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full border border-primary"></div>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'multiple_choice' && question.options && (
                        <div className="pl-5 space-y-1">
                          {question.options.map((option, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border border-primary"></div>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'true_false' && (
                        <div className="pl-5 space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border border-primary"></div>
                            <span>True</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border border-primary"></div>
                            <span>False</span>
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'text' && (
                        <div className="pl-5">
                          <div className="h-20 w-full border rounded border-input bg-background"></div>
                        </div>
                      )}
                      
                      {question.type === 'scale' && (
                        <div className="pl-5">
                          <div className="flex justify-between">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <div key={num} className="flex flex-col items-center">
                                <div className="h-4 w-4 rounded-full border border-primary"></div>
                                <span className="text-xs mt-1">{num}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs mt-2">
                            <span>No pain</span>
                            <span>Worst pain</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button onClick={handleSaveQuiz} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditQuizPage;
