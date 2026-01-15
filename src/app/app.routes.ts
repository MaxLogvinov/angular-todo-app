import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'categories/:category', component: CategoryComponent },
];
