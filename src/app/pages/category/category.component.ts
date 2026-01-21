import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
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
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  category = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('category') as Category)),
    { initialValue: 'Учёба' as Category },
  );

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

  getPrioritySeverity(priority: Priority): 'success' | 'warn' | 'danger' {
    const map = {
      низкий: 'success' as const,
      средний: 'warn' as const,
      высокий: 'danger' as const,
    };
    return map[priority];
  }
}
