import { describe, it, expect } from 'vitest';

describe('Button exports', () => {
  it('should be a function', async () => {
    const mod = await import('./Button');
    expect(typeof mod.default).toBe('function');
  });
});
