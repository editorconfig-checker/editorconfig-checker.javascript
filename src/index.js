#!/usr/bin/env node

import FindFiles from 'node-find-files';

import {fileNotEmpty, filterFiles} from './utils/file-utils';
import {log, error} from './logger/logger';
import validateFile from './validation/validation-processor';
import getEditorconfigForFile from './editorconfig/editorconfig';

let checkedFiles = 0;
let errors = 0;

const filterOptions = {
	regex: '.git|node_modules|coverage|dist|.png|.lock',
	dots: true
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
