import { Component, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Task, Priority } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    TagModule,
    TaskFormComponent,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  taskService = inject(TaskService);

  private taskForm = viewChild(TaskFormComponent);

  openForm(): void {
    this.taskForm()?.open();
  }

  onTaskCreated(task: Omit<Task, 'id' | 'createdAt' | 'completed'>): void {
    this.taskService.addTask(task);
  }

  toggleComplete(id: number): void {
    this.taskService.toggleComplete(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  getPrioritySeverity(priority: Priority): 'success' | 'warn' | 'danger' {
    const map = {
      низкий: 'success' as const,
      средний: 'warn' as const,
      высокий: 'danger' as const,
    };
    return map[priority];
  }
}
