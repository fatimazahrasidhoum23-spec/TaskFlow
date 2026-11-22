import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Task, TaskPriority } from '../models/task.model';
import { PriorityClassPipe } from '../pipes/priority-class.pipe';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, UpperCasePipe, PriorityClassPipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCard {
  /** Donnée reçue du parent (↓). */
  readonly task = input.required<Task>();

  /** Événements remontés au parent (↑) : on émet l'id de la tâche. */
  readonly toggled = output<number>();
  readonly removed = output<number>();

  protected readonly priorityLabels: Record<TaskPriority, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute'
  };

  protected onToggle(): void {
    this.toggled.emit(this.task().id);
  }

  protected onRemove(): void {
    this.removed.emit(this.task().id);
  }
}
