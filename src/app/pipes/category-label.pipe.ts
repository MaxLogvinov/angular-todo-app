import { Pipe, PipeTransform } from '@angular/core';
import { Category, CATEGORY_LABELS } from '../models/task.model';

@Pipe({
  name: 'categoryLabel',
  standalone: true,
})
export class CategoryLabelPipe implements PipeTransform {
  transform(category: Category): string {
    return CATEGORY_LABELS[category];
  }
}
