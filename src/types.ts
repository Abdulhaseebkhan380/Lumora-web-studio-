export interface Project {
  id: string;
  category: 'cleaning' | 'bakery' | 'clinic';
  title: string;
  clientName: string;
  description: string;
  features: string[];
  mockupType: 'browser' | 'mobile';
  performanceScore: number;
  conversionIncrease: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  features: string[];
}

export interface StatCard {
  id: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  iconName: string;
  description: string;
  solution: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  feedback: string;
  rating: number;
}
