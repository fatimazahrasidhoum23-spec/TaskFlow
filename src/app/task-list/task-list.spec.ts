import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';

describe('TaskList', () => {
  let fixture: ComponentFixture<TaskList>;
  let component: TaskList;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TaskList] }).compileComponents();
    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('starts with three tasks', () => {
    expect(component.count()).toBe(3);
    expect(element.querySelectorAll('app-task-card').length).toBe(3);
  });

  it('adds a task without mutating the previous array', () => {
    const before = component.tasks();
    component.addSample();
    expect(component.count()).toBe(4);
    expect(component.tasks()).not.toBe(before);
    expect(before.length).toBe(3);
  });

  it('removes only the targeted task', () => {
    component.remove(2);
    expect(component.tasks().map((t) => t.id)).toEqual([1, 3]);
  });

  it('toggles only the targeted task', () => {
    component.toggle(2);
    expect(component.tasks().find((t) => t.id === 2)?.completed).toBe(true);
    expect(component.tasks().find((t) => t.id === 3)?.completed).toBe(false);
  });

  it('computes the number of remaining tasks', () => {
    expect(component.remaining()).toBe(2);
    component.toggle(2);
    expect(component.remaining()).toBe(1);
  });

  it('shows the empty message after clear()', async () => {
    component.clear();
    await fixture.whenStable();
    expect(component.count()).toBe(0);
    expect(element.querySelector('.empty')?.textContent).toContain('Aucune tâche');
  });

  it('replaces the whole list with reset()', () => {
    component.clear();
    component.reset();
    expect(component.count()).toBe(3);
  });
});
