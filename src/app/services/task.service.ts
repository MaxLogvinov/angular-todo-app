import { Injectable, signal, computed } from '@angular/core';
import { Task, Category } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSignal = signal<Task[]>([
    {
      id: 1,
      title: 'Выучить Angular Signals',
      category: 'Учёба',
      priority: 'высокий',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Сделать отчёт',
      category: 'Работа',
      priority: 'средний',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Купить продукты',
      category: 'Дом',
      priority: 'низкий',
      completed: true,
      createdAt: new Date(),
    },
  ]);

  readonly tasks = this.tasksSignal.asReadonly();

  readonly stats = computed(() => {
    const all = this.tasksSignal();
    return {
      total: all.length,
      completed: all.filter((t) => t.completed).length,
      pending: all.filter((t) => !t.completed).length,
    };
  });

  getTasksByCategory(category: Category): ReturnType<typeof computed<Task[]>> {
    return computed(() => this.tasksSignal().filter((task) => task.category === category));
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date(),
    };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(id: number): void {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  toggleComplete(id: number): void {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }
}
