import { describe, it, expect } from 'vitest';

describe('genId', () => {
  it('should generate unique IDs', async () => {
    const { genId } = await import('@/lib/store');
    const id1 = genId();
    const id2 = genId();
    expect(id1).not.toBe(id2);
  });
});
