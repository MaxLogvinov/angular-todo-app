import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../models/task.model';

@Pipe({
  name: 'prioritySeverity',
  standalone: true,
})
export class PrioritySeverityPipe implements PipeTransform {
  private readonly severityMap: Record<Priority, 'success' | 'warn' | 'danger'> = {
    low: 'success',
    medium: 'warn',
    high: 'danger',
  };

  transform(priority: Priority): 'success' | 'warn' | 'danger' {
    return this.severityMap[priority];
  }
}
