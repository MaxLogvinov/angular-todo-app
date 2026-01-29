import { Component, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { PrioritySeverityPipe } from '../../pipes/priority-severity.pipe';
import { PriorityLabelPipe } from '../../pipes/priority-label.pipe';
import { CategoryLabelPipe } from '../../pipes/category-label.pipe';

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
    PrioritySeverityPipe,
    PriorityLabelPipe,
    CategoryLabelPipe,
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
}
