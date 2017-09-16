import {getExcludePatternFromArgs, getExcludeRegexpFromArgs} from './exclude-utils';

test('should return . if no exclude regexp is given and defaults are ignored', () => {
	const args = {
		'ignore-defaults': true
	};
	expect(getExcludeRegexpFromArgs(args)).toEqual('');
});

test('should give correct regex for excludes', () => {
	const args = {
		'exclude-regexp': ['abc', 'def'],
		'ignore-defaults': true
	};
	expect(getExcludeRegexpFromArgs(args)).toEqual('abc|def');
});

test('should include defaults', () => {
	const args = {
		'exclude-pattern': ['abc', 'def']
	};

	const expected = [
		'abc',
		'def',
		'./**/vendor/**/*',
		'./**/node_modules/**/*',
		'./**/coverage/**/*',
		'./**/.DS_Store/**/*',
		'./.git/**',
		'./**/*.gif',
		'./**/*.png',
		'./**/*.bmp',
		'./**/*.jpg',
		'./**/*.svg',
		'./**/*.ico',
		'./**/*.lock',
		'./**/*.eot',
		'./**/*.woff',
		'./**/*.woff2',
		'./**/*.ttf',
		'./**/*.bak',
		'./**/*.bin',
		'./**/*.min.js',
		'./**/*.min.css',
		'./**/*.pdf',
		'./**/*.jpeg'
	];

	expect(getExcludePatternFromArgs(args)).toEqual(expected);
});

test('should not include defaults', () => {
	const args = {
		'exclude-pattern': ['abc', 'def'],
		'ignore-defaults': true
	};

	const expected = [
		'abc',
		'def'
	];

	expect(getExcludePatternFromArgs(args)).toEqual(expected);
});

test('should give defaults', () => {
	const args = {
	};

	const expected = [
		'./**/vendor/**/*',
		'./**/node_modules/**/*',
		'./**/coverage/**/*',
		'./**/.DS_Store/**/*',
		'./.git/**',
		'./**/*.gif',
		'./**/*.png',
		'./**/*.bmp',
		'./**/*.jpg',
		'./**/*.svg',
		'./**/*.ico',
		'./**/*.lock',
		'./**/*.eot',
		'./**/*.woff',
		'./**/*.woff2',
		'./**/*.ttf',
		'./**/*.bak',
		'./**/*.bin',
		'./**/*.min.js',
		'./**/*.min.css',
		'./**/*.pdf',
		'./**/*.jpeg'
	];

	expect(getExcludePatternFromArgs(args)).toEqual(expected);
});

test('should give empty array', () => {
	const args = {
		'ignore-defaults': true
	};

	const expected = [
	];

	expect(getExcludePatternFromArgs(args)).toEqual(expected);
});
