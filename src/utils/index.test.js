import { color2string } from '.';

test('color2string', () => {
  expect(color2string([1, 2, 3])).toBe('rgb(1, 2, 3)');
  expect(color2string([1, 2, 3, 0.5])).toBe('rgba(1, 2, 3, 0.50)');
});
