import { sum } from './sample';

describe('sum', () => {
  it('should sum', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
