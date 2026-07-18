export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface FilterSettings {
  searchQuery: string;
  status: 'all' | 'active' | 'completed';
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  sortBy: 'date' | 'priority' | 'title';
}

export interface Statistics {
  total: number;
  completed: number;
  pending: number;
  completionPercentage: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
}