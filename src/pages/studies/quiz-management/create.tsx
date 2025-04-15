
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { QuizFrequency, QuestionType, QuizQuestion } from '@/types/quiz';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    studyId: "",
    siteId: "",
    frequency: "weekly" as QuizFrequency,
    customFrequencyDays: 7,
    questions: [
      {
        id: "q1",
        type: "single_choice" as QuestionType,
        question: "",
        options: ["Option 1"],
        required: false
      }
    ],
    startDate: new Date(),
    endDate: undefined as Date | undefined
  });

  const updateQuizField = (field: string, value: any) => {
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
    const newQuestion = {
      id: `q${quiz.questions.length + 1}`,
      type: "single_choice" as QuestionType,
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
      updatedQuestion.options = undefined;
    } else if (type === 'text' || type === 'scale') {
      updatedQuestion.options = undefined;
    }
    
    newQuestions[index] = updatedQuestion;
    setQuiz(prev => ({
      ...prev,
      questions: newQuestions
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate form
    if (!quiz.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Quiz title is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!quiz.studyId.trim()) {
      toast({
        title: "Validation Error",
        description: "Study ID is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (quiz.questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one question is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Validate each question
    const invalidQuestions = quiz.questions.filter(q => !q.question.trim());
    if (invalidQuestions.length > 0) {
      toast({
        title: "Validation Error",
        description: "All questions must have text",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, you would save the quiz to your backend here
    setTimeout(() => {
      toast({
        title: "Quiz Created",
        description: "Your quiz has been successfully created"
      });
      setIsSubmitting(false);
      // Navigate to quiz management page after creation
      navigate('/studies/quiz-management');
    }, 1000);
  };

  const frequencyOptions: QuizFrequency[] = [
    'hourly', 'daily', 'weekly', 'fortnightly', 'monthly', 'yearly', 'custom'
  ];

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
            <h1 className="text-2xl font-bold">Create New Quiz</h1>
            <p className="text-muted-foreground">Create a new quiz for your study or site</p>
          </div>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Quiz
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Quiz Title<span className="text-destructive">*</span></Label>
                  <Input 
                    id="title" 
                    value={quiz.title} 
                    onChange={e => updateQuizField('title', e.target.value)}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={quiz.description} 
                    onChange={e => updateQuizField('description', e.target.value)}
                    placeholder="Describe the purpose of this quiz"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studyId">Study ID<span className="text-destructive">*</span></Label>
                    <Input 
                      id="studyId" 
                      value={quiz.studyId} 
                      onChange={e => updateQuizField('studyId', e.target.value)}
                      placeholder="Enter study ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteId">Site ID (Optional)</Label>
                    <Input 
                      id="siteId" 
                      value={quiz.siteId} 
                      onChange={e => updateQuizField('siteId', e.target.value)}
                      placeholder="Leave empty for all sites"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="frequency">Frequency<span className="text-destructive">*</span></Label>
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
                        value={quiz.customFrequencyDays} 
                        onChange={e => updateQuizField('customFrequencyDays', parseInt(e.target.value))}
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date<span className="text-destructive">*</span></Label>
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
              <CardTitle>Questions</CardTitle>
              <Button onClick={addQuestion} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Question
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No questions added yet. Click "Add Question" to get started.
                  </div>
                ) : (
                  quiz.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-md p-4 animate-fade-in">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeQuestion(index)}
                          disabled={quiz.questions.length <= 1}
                        >
                          Remove
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
                          <Label>Question Text<span className="text-destructive">*</span></Label>
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
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This is a preview of how your quiz will appear to patients.
              </p>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">{quiz.title || "Untitled Quiz"}</h3>
                {quiz.description && (
                  <p className="text-muted-foreground mb-6">{quiz.description}</p>
                )}
                
                <div className="space-y-6">
                  {quiz.questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <p className="font-medium">
                        {index + 1}. {question.question || "Question text goes here"}
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
          
          <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Quiz
              </>
            )}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateQuizPage;

