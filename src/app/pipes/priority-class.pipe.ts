import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../models/task.model';

/** Transforme une priorité en classe CSS : la couleur reste dans le fichier de style. */
@Pipe({ name: 'priorityClass' })
export class PriorityClassPipe implements PipeTransform {
  transform(priority: TaskPriority): string {
    return `priority-${priority}`;
  }
}
