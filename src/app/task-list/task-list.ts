import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Task, TaskPriority } from '../models/task.model';
import { TaskCard } from '../task-card/task-card';

const INITIAL_TASKS: readonly Task[] = [
  { id: 1, title: 'Réviser le chapitre sur les signals', completed: true, priority: 'medium', dueDate: '2026-11-23' },
  { id: 2, title: 'Rendre le TP Angular', completed: false, priority: 'high', dueDate: '2026-11-27' },
  { id: 3, title: 'Préparer la présentation du projet', completed: false, priority: 'low', dueDate: '2026-12-04' }
];

const SAMPLE_TITLES: readonly string[] = [
  'Relire mes notes de cours',
  'Corriger les tests qui échouent',
  'Ranger mon dépôt GitHub',
  "Réviser pour l'examen"
];

const SAMPLE_PRIORITIES: readonly TaskPriority[] = ['low', 'medium', 'high'];

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList {
  /** État de la liste : on ne le modifie jamais directement, seulement via set() / update(). */
  readonly tasks = signal<Task[]>([...INITIAL_TASKS]);

  /** Valeurs dérivées : recalculées automatiquement quand tasks change. */
  readonly count = computed(() => this.tasks().length);
  readonly remaining = computed(() => this.tasks().filter((t) => !t.completed).length);

  /** Ajoute une tâche en créant un nouveau tableau (jamais de push). */
  add(task: Task): void {
    this.tasks.update((items) => [...items, task]);
  }

  /** Supprime une tâche : on garde toutes les autres. */
  remove(id: number): void {
    this.tasks.update((items) => items.filter((t) => t.id !== id));
  }

  /** Inverse l'état « terminée » de la seule tâche visée. */
  toggle(id: number): void {
    this.tasks.update((items) =>
      items.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  /** Réinitialise toute la liste. */
  clear(): void {
    this.tasks.set([]);
  }

  /** Remplace complètement la liste par la liste d'exemple. */
  reset(): void {
    this.tasks.set([...INITIAL_TASKS]);
  }

  /** Crée une tâche d'exemple (le vrai formulaire viendra avec les Reactive Forms). */
  addSample(): void {
    const items = this.tasks();
    const nextId = Math.max(0, ...items.map((t) => t.id)) + 1;
    const due = new Date();
    due.setDate(due.getDate() + 7);

    this.add({
      id: nextId,
      title: SAMPLE_TITLES[items.length % SAMPLE_TITLES.length],
      completed: false,
      priority: SAMPLE_PRIORITIES[items.length % SAMPLE_PRIORITIES.length],
      dueDate: due.toISOString().slice(0, 10)
    });
  }
}