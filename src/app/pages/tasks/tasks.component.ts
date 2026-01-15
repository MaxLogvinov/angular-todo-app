import { Component, inject, viewChild } from '@angular/core';
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
  template: `
    <div class="tasks-page">
      <header class="page-header">
        <h1>📝 Мои задачи</h1>
        <div class="stats">
          <span>Всего: {{ taskService.stats().total }}</span>
          <span>Выполнено: {{ taskService.stats().completed }}</span>
          <span>В работе: {{ taskService.stats().pending }}</span>
        </div>
      </header>

      <div class="actions">
        <p-button label="Добавить задачу" icon="pi pi-plus" (click)="openForm()" />
      </div>

      <p-table
        [value]="taskService.tasks()"
        [tableStyle]="{ 'min-width': '50rem' }"
        styleClass="p-datatable-striped"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Статус</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Приоритет</th>
            <th>Дата создания</th>
            <th>Действия</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-task>
          <tr [class.completed-row]="task.completed">
            <td>
              <p-button
                [icon]="task.completed ? 'pi pi-check-circle' : 'pi pi-circle'"
                [rounded]="true"
                [text]="true"
                [severity]="task.completed ? 'success' : 'secondary'"
                (click)="toggleComplete(task.id)"
              />
            </td>
            <td [class.completed-text]="task.completed">
              {{ task.title }}
            </td>
            <td>
              <a [routerLink]="['/categories', task.category]" class="category-link">
                {{ task.category }}
              </a>
            </td>
            <td>
              <p-tag
                [value]="task.priority | titlecase"
                [severity]="getPrioritySeverity(task.priority)"
              />
            </td>
            <td>{{ task.createdAt | date: 'dd.MM.yyyy HH:mm' }}</td>
            <td>
              <p-button
                icon="pi pi-trash"
                [rounded]="true"
                [text]="true"
                severity="danger"
                (click)="deleteTask(task.id)"
              />
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="6" class="empty-message">Задач пока нет. Создайте первую! 🚀</td>
          </tr>
        </ng-template>
      </p-table>

      <app-task-form (taskCreated)="onTaskCreated($event)" />
    </div>
  `,
  styles: [
    `
      .tasks-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .page-header h1 {
        margin-bottom: 0.5rem;
        color: #333;
      }

      .stats {
        display: flex;
        gap: 1.5rem;
        color: #666;
      }

      .actions {
        margin-bottom: 1.5rem;
      }

      .completed-row {
        opacity: 0.6;
      }

      .completed-text {
        text-decoration: line-through;
        color: #888;
      }

      .category-link {
        color: #3b82f6;
        text-decoration: none;
      }

      .category-link:hover {
        text-decoration: underline;
      }

      .empty-message {
        text-align: center;
        padding: 2rem;
        color: #888;
      }
    `,
  ],
})
export class TasksComponent {
  taskService = inject(TaskService);

  private taskForm = viewChild(TaskFormComponent);

  openForm() {
    this.taskForm()?.open();
  }

  onTaskCreated(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
    this.taskService.addTask(task);
  }

  toggleComplete(id: number) {
    this.taskService.toggleComplete(id);
  }

  deleteTask(id: number) {
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
