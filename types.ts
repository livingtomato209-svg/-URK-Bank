export interface PageSchema {
  title: string;
  route: string;
  summary: string;
  keyFeatures: string[];
}

export interface WebsitePlan {
  projectName: string;
  targetAudience: string;
  designVibe: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  pages: PageSchema[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}