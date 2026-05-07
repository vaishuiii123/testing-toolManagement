export interface Tool {
  id?: number;
  name: string;
  company: string;
  requestor: string;
  practice: string;
  type: 'new' | 'existing';
  step: number;
  createdAt?: string;
}

export type FilterType = 'all' | 'progress' | 'completed' | 'new';
