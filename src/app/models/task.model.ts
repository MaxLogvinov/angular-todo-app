export interface Task {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
}

export type Category = 'study' | 'work' | 'home';
export type Priority = 'low' | 'medium' | 'high';

export const CATEGORIES: Category[] = ['study', 'work', 'home'];
export const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export const CATEGORY_LABELS: Record<Category, string> = {
  study: 'Учёба',
  work: 'Работа',
  home: 'Дом',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};
