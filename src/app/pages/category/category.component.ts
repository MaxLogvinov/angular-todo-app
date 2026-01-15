import { Component, inject, computed } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TaskService } from '../../services/task.service';
import { Category, Priority } from '../../models/task.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    TagModule,
    DatePipe,
    TitleCasePipe,
  ],
  template: `
    <div class="category-page">
      <header class="page-header">
        <p-button icon="pi pi-arrow-left" label="Назад" [text]="true" routerLink="/tasks" />
        <h1>📁 Категория: {{ category() }}</h1>
        <p>Найдено задач: {{ filteredTasks().length }}</p>
      </header>

      <p-table
        [value]="filteredTasks()"
        [tableStyle]="{ 'min-width': '50rem' }"
        styleClass="p-datatable-striped"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Статус</th>
            <th>Название</th>
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
            <td colspan="5" class="empty-message">В этой категории задач нет 📭</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `
      .category-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .page-header h1 {
        margin: 0.5rem 0;
        color: #333;
      }

      .page-header p {
        color: #666;
      }

      .completed-row {
        opacity: 0.6;
      }

      .completed-text {
        text-decoration: line-through;
        color: #888;
      }

      .empty-message {
        text-align: center;
        padding: 2rem;
        color: #888;
      }
    `,
  ],
})
export class CategoryComponent {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  category = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('category') as Category)),
    { initialValue: 'Учёба' as Category },
  );

  // Computed signal для фильтрации задач
  filteredTasks = computed(() => {
    const cat = this.category();
    return this.taskService.tasks().filter((task) => task.category === cat);
  });

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
