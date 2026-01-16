import { Component, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Task, Category, Priority, CATEGORIES, PRIORITIES } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, SelectModule],
  template: `
    <p-dialog
      header="Новая задача"
      [visible]="visible()"
      (visibleChange)="visible.set($event)"
      [modal]="true"
      [style]="{ width: '400px' }"
      [contentStyle]="{ overflow: 'visible' }"
    >
      <div class="form-group">
        <label for="title">Название</label>
        <input
          pInputText
          id="title"
          [(ngModel)]="title"
          placeholder="Введите название задачи"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="category">Категория</label>
        <p-select
          id="category"
          [(ngModel)]="selectedCategory"
          [options]="categories"
          placeholder="Выберите категорию"
          appendTo="body"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="priority">Приоритет</label>
        <p-select
          id="priority"
          [(ngModel)]="selectedPriority"
          [options]="priorities"
          placeholder="Выберите приоритет"
          appendTo="body"
          class="w-full"
        />
      </div>

      <ng-template pTemplate="footer">
        <p-button label="Отмена" severity="secondary" (click)="close()" />
        <p-button label="Создать" (click)="submit()" [disabled]="!isValid()" />
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      .form-group {
        margin-bottom: 1rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
      }

      .w-full {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  taskCreated = output<Omit<Task, 'id' | 'createdAt' | 'completed'>>();

  visible = signal(false);
  title = '';
  selectedCategory: Category | null = null;
  selectedPriority: Priority | null = null;

  categories = CATEGORIES;
  priorities = PRIORITIES;

  open(): void {
    this.resetForm();
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }

  isValid(): boolean {
    return !!(this.title.trim() && this.selectedCategory && this.selectedPriority);
  }

  submit(): void {
    if (this.isValid()) {
      this.taskCreated.emit({
        title: this.title.trim(),
        category: this.selectedCategory!,
        priority: this.selectedPriority!,
      });
      this.close();
    }
  }

  private resetForm(): void {
    this.title = '';
    this.selectedCategory = null;
    this.selectedPriority = null;
  }
}
