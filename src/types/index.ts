export type OptionId = 'ก' | 'ข' | 'ค' | 'ง';

export interface QuizOption {
  id: OptionId;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  scenario?: string;
  options: QuizOption[];
  correctOption: OptionId;
  explanation: string;
  referenceAuthority: string;
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOption: OptionId;
  isCorrect: boolean;
  timestamp: number;
}

export interface BadgeInfo {
  id: string;
  title: string;
  englishTitle: string;
  tier: 'gold' | 'silver' | 'bronze';
  minScore: number;
  maxScore: number;
  description: string;
  badgeTag: string;
  accentColor: string;
}

export type ResourceCategory = 
  | 'all'
  | 'ocsc'
  | 'copyright'
  | 'film_archive'
  | 'streaming_mil'
  | 'media_literacy'
  | 'international';

export interface ResourceItem {
  id: string;
  title: string;
  englishTitle: string;
  organization: string;
  category: Exclude<ResourceCategory, 'all'>;
  categoryLabel: string;
  description: string;
  keyTakeaways: string[];
  documentType: string;
  url: string;
  publicationYear: string;
  featured?: boolean;
}
