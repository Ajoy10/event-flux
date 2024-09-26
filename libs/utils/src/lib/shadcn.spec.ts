import { cn } from './shadcn';

describe('cn function', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('should handle conditional class names', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('class1', isActive && 'active', isDisabled && 'disabled')).toBe(
      'class1 active'
    );
  });

  it('should handle undefined and null values', () => {
    expect(cn('class1', undefined, 'class2', null)).toBe('class1 class2');
  });
});
