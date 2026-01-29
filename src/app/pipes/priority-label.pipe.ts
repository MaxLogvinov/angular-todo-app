import { Pipe, PipeTransform } from '@angular/core';
import { Priority, PRIORITY_LABELS } from '../models/task.model';

@Pipe({
  name: 'priorityLabel',
  standalone: true,
})
export class PriorityLabelPipe implements PipeTransform {
  transform(priority: Priority): string {
    return PRIORITY_LABELS[priority];
  }
}
