import { calculateOrder } from '../index';
test('Test default wall order with normal length', () => {
  // It should have board, track, stood, and 3types of screws
  expect(calculateOrder(8)).toHaveLength(6);
});

test('Test default wall order with very short length', () => {
  // It should have board, track, stood, and 3types of screws
  expect(calculateOrder(0.5)).toHaveLength(6);
});


test('Test wall with very high wall', () => {
  // It should have board, track, stood, and 3types of screws
  expect(calculateOrder(8,200)).toBe('Theres no boards for that high wall');
});
