import { PriorityClassPipe } from './priority-class.pipe';

describe('PriorityClassPipe', () => {
  const pipe = new PriorityClassPipe();

  it('returns a CSS class for each priority', () => {
    expect(pipe.transform('low')).toBe('priority-low');
    expect(pipe.transform('medium')).toBe('priority-medium');
    expect(pipe.transform('high')).toBe('priority-high');
  });
});
