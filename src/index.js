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

const parseOptions = {
	string: ['e', 'exclude'],
	boolean: ['dotfiles', 'help', 'ignore-defaults', 'list-files'],
	alias: {dotfiles: 'd', exclude: 'e', help: 'h', 'ignore-defaults': 'i', 'list-files': 'l'}
};

const args = parseArgs(process.argv.slice(2), parseOptions);

let checkedFiles = 0;
let errors = 0;

const filterOptions = {
	regex: getExcludeStringFromArgs(args),
	dots: !(args.dots)
};

const finder = new FindFiles({
	rootFolder: '.',
	filterFunction: (filePath, stat) => fileNotEmpty(stat) && filterFiles(filePath, filterOptions)
});

finder.on('match', filePath => {
	if (args['list-files']) {
		info(filePath);
	}
	const editorconfig = getEditorconfigForFile(filePath);
	checkedFiles++;
	errors += validateFile(filePath, editorconfig);
});

finder.on('patherror', (err, strPath) => {
	error(`Error for Path ${strPath} ${err}`);
});

finder.on('error', err => {
	error(`Global Error ${err}`);
});

finder.on('complete', () => {
	info('all done');
	if (errors === 0) {
		success(`sucessfully checked ${checkedFiles} files`);
	} else {
		error(`${errors} occured! See log above and fix errors`);
		if (errors < 254) {
			process.exit(errors);
		} else {
			process.exit(254);
		}
	}
});

if (args.help) {
	printUsage();
}

finder.startSearch();
