export interface Task {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
}

export type Category = 'Учёба' | 'Работа' | 'Дом';
export type Priority = 'низкий' | 'средний' | 'высокий';

export const CATEGORIES: Category[] = ['Учёба', 'Работа', 'Дом'];
export const PRIORITIES: Priority[] = ['низкий', 'средний', 'высокий'];
