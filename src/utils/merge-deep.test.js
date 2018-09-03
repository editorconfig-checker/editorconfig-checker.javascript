import mergeDeep from './merge-deep';

/* eslint-disable camelcase */

test('should merge two objects with different keys', () => {
	const a = {'*.js': {indent_size: 2}};
	const b = {'*': {indent_style: 'space'}};
	const merged = mergeDeep({}, a, b);

	expect(merged).toEqual({'*': {indent_style: 'space'}, '*.js': {indent_size: 2}});
});

test('should deep merge two objects', () => {
	const a = {'*.js': {indent_size: 2}};
	const b = {'*.js': {indent_style: 'space'}};
	const merged = mergeDeep({}, a, b);

	expect(merged).toEqual({'*.js': {indent_size: 2, indent_style: 'space'}});
});

test('should deep merge two objects', () => {
	const merged = mergeDeep({a: 1}, {b: {c: {d: {e: 12345}}}});
	expect(merged).toEqual({a: 1, b: {c: {d: {e: 12345}}}});
});

test('should deep merge two objects', () => {
	const merged = mergeDeep({a: 1}, {b: {c: {d: ['abc']}}});
	expect(merged).toEqual({a: 1, b: {c: {d: ['abc']}}});
});

test('should return original argument if its not an object', () => {
	const merged = mergeDeep('abc', {b: {c: {d: ['abc']}}});
	expect(merged).toEqual('abc');
});

/* eslint-enable camelcase */
