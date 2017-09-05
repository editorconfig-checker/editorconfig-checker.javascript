#!/usr/bin/env node

import FindFiles from 'node-find-files';
import parseArgs from 'minimist';

import {fileNotEmpty, filterFiles} from './utils/file-utils';
import {log, info, success, error} from './logger/logger';
import validateFile from './validation/validation-processor';
import getEditorconfigForFile from './editorconfig/editorconfig';

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

const args = parseArgs(process.argv.slice(2));

let checkedFiles = 0;
let errors = 0;

const filterOptions = {
	regex: '.git|node_modules|coverage|TestFiles|dist|.png|.lock',
	dots: !(args.d || args.dots)
};

const finder = new FindFiles({
	rootFolder: '.',
	filterFunction: (filePath, stat) => fileNotEmpty(stat) && filterFiles(filePath, filterOptions)
});

finder.on('match', filePath => {
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

if (args.h || args.help) {
	printUsage();
}

finder.startSearch();
