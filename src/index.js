#!/usr/bin/env node

import FindFiles from 'node-find-files';
import parseArgs from 'minimist';

import {log, info, success, error} from './logger/logger';
import validateFile from './validation/validation-processor';
import getEditorconfigForFile from './editorconfig/editorconfig';
import {fileNotEmpty, filterFiles} from './utils/file-utils';
import getExcludeStringFromArgs from './utils/exclude-utils';

const printUsage = () => {
	log('Usage:');
	log('editorconfig-checker [OPTIONS] [<FILE>|FILEGLOB>]');
	log('-d, --dotfiles');
	log('    use this flag if you want to exclude dotfiles');
	log('-e <PATTERN>, --exclude <PATTERN>');
	log('    string or regex to filter files which should not be checked');
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
	string: ['e', 'exclude'],
	boolean: ['dotfiles', 'help', 'ignore-defaults', 'list-files'],
	alias: {dotfiles: 'd', exclude: 'e', help: 'h', 'ignore-defaults': 'i', 'list-files': 'l'}
};

const args = parseArgs(process.argv.slice(2), parseOptions);

let checkedFiles = 0;
let errors = {};

const filterOptions = {
	regex: getExcludeStringFromArgs(args),
	dots: !(args.dots)
};

if (typeof args._ === 'object' && args._.length === 0) {
	args._ = ['.'];
} else if (typeof args._ === 'string' && args._.length === 1) {
	args._ = [args._];
}

args._.forEach((folder, index, folders) => {
	const finder = new FindFiles({
		rootFolder: folder,
		filterFunction: (filePath, stat) => fileNotEmpty(stat) && filterFiles(filePath, filterOptions)
	});

	finder.on('match', filePath => {
		if (args['list-files']) {
			info(filePath);
		}
		const editorconfig = getEditorconfigForFile(filePath);
		const error = {};
		error[filePath] = validateFile(filePath, editorconfig);
		errors = Object.assign({}, errors, error);
		checkedFiles++;
	});

	finder.on('patherror', (err, strPath) => {
		error(`Error for Path ${strPath} ${err}`);
	});

	finder.on('error', err => {
		error(`Global Error ${err}`);
	});

	finder.on('complete', () => {
		if (index === folders.length - 1) {
			const errorCount = Object.keys(errors).reduce((acc, err) => (acc + errors[err].length), 0);
			if (errorCount === 0) {
				success(`sucessfully checked ${checkedFiles} files :)`);
			} else {
				printErrors(errors);
				error(`${errorCount} errors occured! See log above and fix errors`);
				if (errorCount < 254) {
					process.exit(errorCount);
				} else {
					process.exit(254);
				}
			}
		}
	});

	finder.startSearch();
});

if (args.help) {
	printUsage();
}
