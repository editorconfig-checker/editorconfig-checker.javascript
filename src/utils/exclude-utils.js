const getDefaultExcludes = () => {
	return [
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
};

// Quickfix for this issue
// https://github.com/editorconfig-checker/editorconfig-checker.javascript/issues/18
const getDefaultExcludesRegexp = () => {
	return [
		'vendor/',
		'node_modules/',
		'coverage/',
		'.DS_Store/',
		'.git/',
		'.gif$',
		'.png$',
		'.bmp$',
		'.jpg$',
		'.svg$',
		'.ico$',
		'.lock$',
		'.eot$',
		'.woff$',
		'.woff2$',
		'.ttf$',
		'.bak$',
		'.bin$',
		'.min.js$',
		'.min.css$',
		'.pdf$',
		'.jpeg$'
	];
};

const getExcludePatternFromArgs = args => {
	const excludesArray = [];

	if ('exclude-pattern' in args) {
		excludesArray.push(args['exclude-pattern']);
	}

	if (!args['ignore-defaults']) {
		excludesArray.push(getDefaultExcludes());
	}

	return [].concat(...excludesArray);
};

const getExcludeRegexpFromArgs = args => {
	const excludesArray = [];
	if ('exclude-regexp' in args) {
		excludesArray.push(args['exclude-regexp']);
	}

	if (!args['ignore-defaults']) {
		excludesArray.push(getDefaultExcludesRegexp());
	}

	const excludeString = [].concat(...excludesArray).join('|');

	return excludeString || '';
};

export {getExcludePatternFromArgs, getExcludeRegexpFromArgs};
