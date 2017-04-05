#!/usr/bin/env node

import iniparser from 'iniparser';
import FindFiles from 'node-find-files';

import {fileExists, fileNotEmpty, filterFiles, editorconfigPath} from './utils/file-utils';
import {log, error} from './logger/logger';
import validateFile from './validation/validation-processor';

// No editorconfig no fun
if (!fileExists(editorconfigPath())) {
	error(`ERROR: no .editorconfig found: ${editorconfigPath()}`);
	process.exit(1);
}

const editorconfig = iniparser.parseSync(editorconfigPath());
let checkedFiles = 0;
let errors = 0;

const filterOptions = {
	regex: '.git|node_modules|coverage|dist',
	dots: true
};

const finder = new FindFiles({
	rootFolder: '.',
	filterFunction: (file, stat) => fileNotEmpty(stat) && filterFiles(file, filterOptions)
});

finder.on('match', file => {
	checkedFiles++;
	errors += validateFile(file, editorconfig);
});

finder.on('patherror', (err, strPath) => {
	error(`Error for Path ${strPath} ${err}`);
});

finder.on('error', err => {
	error(`Global Error ${err}`);
});

finder.on('complete', () => {
	log('all done');
	if (errors === 0) {
		log(`sucessfully checked ${checkedFiles} files`);
	} else {
		error(`${errors} occured! See log above and fix errors`);
		if (errors < 254) {
			process.exit(errors);
		} else {
			process.exit(254);
		}
	}
});

finder.startSearch();
