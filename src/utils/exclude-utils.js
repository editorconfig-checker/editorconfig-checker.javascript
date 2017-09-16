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

const getExcludePatternFromArgs = args => {
	const excludesArray = [];

	if ('exclude-pattern' in args) {
		excludesArray.push(args['exclude-pattern']);
	}

	if (!args['ignore-defaults']) {
		excludesArray.push(getDefaultExcludes());
	}

	return [].concat.apply([], excludesArray);
};

const getExcludeRegexpFromArgs = args => {
	const excludesArray = [];
	if ('exclude-regexp' in args) {
		excludesArray.push(args['exclude-regexp']);
	}

	const excludeString = []
		.concat.apply([], excludesArray)
		.join('|');

	return excludeString || '';
};

export {getExcludePatternFromArgs, getExcludeRegexpFromArgs};
