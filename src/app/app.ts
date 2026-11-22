import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Home } from './home/home';
import { About } from './about/about';
import { TaskList } from './task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [Home, About, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly defaultTitle = 'TaskFlow';

  readonly title = signal(this.defaultTitle);

  toggleTitle(): void {
    this.title.update((current) => (current === this.defaultTitle ? 'Mes tâches' : this.defaultTitle));
  }
}
