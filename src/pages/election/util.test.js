import {getNextSlug} from './util';

test('gets next slug', () => {
  expect(getNextSlug('foo', ['foo', 'bar'])).toBe('foo1');
});
