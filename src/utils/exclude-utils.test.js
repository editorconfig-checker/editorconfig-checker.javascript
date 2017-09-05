import getDefaultExcludes from './exclude-utils';

test('should give an empty string if no exclude pattern is given and defaults are ignored', () => {
	const args = {
		'ignore-defaults': true
	};
	expect(getDefaultExcludes(args)).toEqual('');
});

test('should give correct regex for excludes', () => {
	const args = {
		exclude: ['abc', 'def'],
		'ignore-defaults': true
	};
	expect(getDefaultExcludes(args)).toEqual('abc|def');
});

test('should include defaults', () => {
	const args = {
		exclude: ['abc', 'def']
	};
	expect(getDefaultExcludes(args)).toEqual('abc|def|vendor|node_modules|coverage|\\.git|\\.DS_Store|\\.gif$|\\.png$|\\.bmp$|\\.jpg$|\\.svg$|\\.ico$|\\.lock$|\\.eot$|\\.woff$|\\.woff2$|\\.ttf$|\\.bak$|\\.bin$|\\.min.js$|\\.min.css$|\\.pdf$|\\.jpeg$');
});
