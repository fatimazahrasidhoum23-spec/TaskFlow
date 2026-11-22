import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCard } from './task-card';
import { Task } from '../models/task.model';

describe('TaskCard', () => {
  const task: Task = {
    id: 7,
    title: 'Lire le cours',
    completed: false,
    priority: 'high',
    dueDate: '2026-11-15'
  };

  let fixture: ComponentFixture<TaskCard>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TaskCard] }).compileComponents();
    fixture = TestBed.createComponent(TaskCard);
    fixture.componentRef.setInput('task', task);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('shows the title in uppercase and the formatted date', () => {
    expect(element.querySelector('.title')?.textContent).toContain('LIRE LE COURS');
    expect(element.querySelector('.due')?.textContent).toContain('15/11/2026');
  });

  it('applies the CSS class of the priority', () => {
    expect(element.querySelector('.badge')?.classList).toContain('priority-high');
  });

  it('emits the task id when toggled', () => {
    let emitted: number | undefined;
    fixture.componentInstance.toggled.subscribe((id) => (emitted = id));
    (element.querySelector('.actions button') as HTMLButtonElement).click();
    expect(emitted).toBe(7);
  });

  it('emits the task id when removed', () => {
    let emitted: number | undefined;
    fixture.componentInstance.removed.subscribe((id) => (emitted = id));
    (element.querySelector('.btn-danger') as HTMLButtonElement).click();
    expect(emitted).toBe(7);
  });
});
