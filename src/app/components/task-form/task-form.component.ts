import { Component, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import {
  Task,
  Category,
  Priority,
  CATEGORIES,
  PRIORITIES,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
} from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  taskCreated = output<Omit<Task, 'id' | 'createdAt' | 'completed'>>();

  visible = signal(false);
  title = '';
  selectedCategory: Category | null = null;
  selectedPriority: Priority | null = null;

  categories = CATEGORIES.map((c) => ({ label: CATEGORY_LABELS[c], value: c }));
  priorities = PRIORITIES.map((p) => ({ label: PRIORITY_LABELS[p], value: p }));

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
