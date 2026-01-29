import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TaskService } from '../../services/task.service';
import { Category, CATEGORY_LABELS } from '../../models/task.model';
import { PrioritySeverityPipe } from '../../pipes/priority-severity.pipe';
import { PriorityLabelPipe } from '../../pipes/priority-label.pipe';
import { CategoryLabelPipe } from '../../pipes/category-label.pipe';

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
    PrioritySeverityPipe,
    PriorityLabelPipe,
    CategoryLabelPipe,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  category = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('category') as Category)),
    { initialValue: 'study' as Category },
  );

  categoryLabels = CATEGORY_LABELS;

  filteredTasks = computed(() => {
    const cat = this.category();
    return this.taskService.tasks().filter((task) => task.category === cat);
  });

  toggleComplete(id: number): void {
    this.taskService.toggleComplete(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
