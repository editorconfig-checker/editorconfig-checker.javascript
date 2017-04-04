#!/usr/bin/env node

import iniparser from 'iniparser';
import FindFiles from 'node-find-files';

import {fileExists, fileNotEmpty, filterFiles, editorconfigPath} from './utils/file-utils';
import {log, info, error} from './logger/logger';

// No editorconfig no fun
/* eslint-disable no-unused-expressions */
!fileExists(editorconfigPath()) && (error(`ERROR: no .editorconfig found: ${editorconfigPath()}`) || process.exit(1));
/* eslint-enable */

const editorconfig = iniparser.parseSync(editorconfigPath());

const filterOptions = {
	regex: '.git|node_modules|coverage|dist',
	dots: true
};

const finder = new FindFiles({
	rootFolder: '.',
	filterFunction: (file, stat) => fileNotEmpty(stat) && filterFiles(file, filterOptions)
});

finder.on('match', (strPath, stat) => {
	log(strPath);
	info('just test output');
	error(stat.size);
});

finder.on('patherror', (err, strPath) => {
	error(`Error for Path ${strPath} ${err}`);
});

finder.on('error', err => {
	error(`Global Error ${err}`);
});

log(editorconfig);

finder.startSearch();
