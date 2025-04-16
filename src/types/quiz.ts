export type QuizFrequency = 
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'fortnightly'
  | 'monthly'
  | 'yearly'
  | 'custom';

export type QuestionType = 
  | 'multiple_choice'
  | 'single_choice'
  | 'true_false'
  | 'text'
  | 'scale'
  | 'date'
  | 'time'
  | 'datetime'
  | 'rating'
  | 'matrix'
  | 'ranking';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  required: boolean;
  allowOther?: boolean;
}

export interface StudyQuiz {
  id: string;
  title: string;
  description?: string;
  studyId: string;
  siteId?: string;
  frequency: QuizFrequency;
  customFrequencyDays?: number;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate?: Date;
}
