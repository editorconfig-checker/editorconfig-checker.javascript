#!/usr/bin/env node

import parseArgs from 'minimist';
import glob from 'glob';
import isValidGlob from 'is-valid-glob';

import {log, info, success, error} from './logger/logger';
import validateFile from './validation/validation-processor';
import getEditorconfigForFile from './editorconfig/editorconfig';
import {filterFiles, isFile, isDirectory} from './utils/file-utils';
import {getExcludeRegexpFromArgs, getExcludePatternFromArgs} from './utils/exclude-utils';

const printUsage = () => {
	log('Usage:');
	log('editorconfig-checker [OPTIONS] [<FILE>|FILEGLOB>]');
	log('-d, --dotfiles');
	log('    use this flag if you want to exclude dotfiles');
	log('--exclude-pattern <PATTERN>');
	log('    pattern to filter files which should not be checked');
	log('--exclude-regexp <REGEXP>');
	log('    regex to filter files which should not be checked');
	log('-i, --ignore-defaults');
	log('    will ignore default excludes, see README for details');
	log('-h, --help');
	log('    will print this help text');
	log('-l, --list-files');
	log('    will print all files which are checked to stdout');
};

const printErrors = errors => {
	let printedErrors = 1;
	for (const err in errors) {
		if (errors[err].length === 0) {
			continue;
		}

		info(`${printedErrors}) ${err}`);
		errors[err].forEach(errMsg => error(`\t${errMsg}`));
		log('');
		printedErrors++;
	}
};

const parseOptions = {
	string: ['exclude-pattern', 'exclude-regexp'],
	boolean: ['dotfiles', 'help', 'ignore-defaults', 'list-files'],
	alias: {dotfiles: 'd', help: 'h', 'ignore-defaults': 'i', 'list-files': 'l'}
};

const args = parseArgs(process.argv.slice(2), parseOptions);

if (args.help) {
	printUsage();
	process.exit(0);
}

const filterOptions = {
	'exclude-pattern': getExcludePatternFromArgs(args),
	'exclude-regexp': getExcludeRegexpFromArgs(args),
	dots: !(args.dots)
};

if (typeof args._ === 'object' && args._.length === 0) {
	args._ = ['.'];
} else if (typeof args._ === 'string' && args._.length === 1) {
	args._ = [args._];
}

const rawFiles = args._.map(folder => {
	const globOptions = {
		dot: filterOptions.dots,
		nodir: true,
		ignore: filterOptions['exclude-pattern']
	};

	if (isFile(folder)) {
		return folder;
	}

	let globPattern = '';
	if (isDirectory(folder) || folder === '.' || folder === './') {
		globPattern = `${folder}/**`;
	}

	if (globPattern === '' && isValidGlob(folder)) {
		globPattern = folder;
	}

	return glob.sync(globPattern, globOptions);
});

// Flatten array, filter duplicates and filter respecting options
const files = [].concat(...rawFiles).filter((filePath, index, self) => {
	return self.indexOf(filePath) === index && filterFiles(filePath, filterOptions);
});

let errors = {};
files.forEach(filePath => {
	if (args['list-files']) {
		info(filePath);
	}

	const editorconfig = getEditorconfigForFile(filePath);
	const error = {};
	error[filePath] = validateFile(filePath, editorconfig);
	errors = Object.assign({}, errors, error);
});

const errorCount = Object.keys(errors).reduce((acc, err) => (acc + errors[err].length), 0);
if (errorCount === 0) {
	success(`sucessfully checked ${files.length} files :)`);
} else {
	printErrors(errors);
	error(`${errorCount} errors occured! See log above and fix errors`);
	if (errorCount < 254) {
		process.exit(errorCount);
	} else {
		process.exit(254);
	}
}
