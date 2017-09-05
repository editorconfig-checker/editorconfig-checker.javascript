const getDefaultExcludes = () => {
	return [
		'vendor',
		'node_modules',
		'coverage',
		'\\.git',
		'\\.DS_Store',
		'\\.gif$',
		'\\.png$',
		'\\.bmp$',
		'\\.jpg$',
		'\\.svg$',
		'\\.ico$',
		'\\.lock$',
		'\\.eot$',
		'\\.woff$',
		'\\.woff2$',
		'\\.ttf$',
		'\\.bak$',
		'\\.bin$',
		'\\.min.js$',
		'\\.min.css$',
		'\\.pdf$',
		'\\.jpeg$'
	];
};

const getExcludeStringFromArgs = args => {
	const excludesArray = [];

	if (args.exclude !== undefined) {
		excludesArray.push(args.exclude);
	}

	if (!args['ignore-defaults']) {
		excludesArray.push(getDefaultExcludes());
	}

	const excludeString = []
		.concat.apply([], excludesArray)
		.join('|');

	return excludeString;
};

export default getExcludeStringFromArgs;
