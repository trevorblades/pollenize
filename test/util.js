import {getNextSlug} from '../src/util';

test('gets next slug', () => {
  expect(getNextSlug('foo', ['foo', 'bar'])).toBe('foo1');
});
