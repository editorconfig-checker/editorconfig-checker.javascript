import iniparser from 'iniparser';
import FindFiles from 'node-find-files';

import {fileExists, fileNotEmpty, filterFiles, editorconfigPath} from './utils/file-utils';

// No editorconfig no fun
!fileExists(editorconfigPath()) && (console.error(`ERROR: no .editorconfig found: ${editorconfigPath()}`) || process.exit(1));

const editorconfig = iniparser.parseSync(editorconfigPath());

const filterOptions = {
	regex: '.git|node_modules|coverage|dist',
	dots: true
}

const finder = new FindFiles({
	rootFolder: '.',
	filterFunction: (file, stat) => fileNotEmpty(stat) && filterFiles(file, filterOptions)
});

finder.on('match', (strPath, stat) => {
	console.log(strPath);
	console.log(stat.size);
});

finder.on('patherror', (err, strPath) => {
	console.error(`Error for Path ${strPath} ${err}`);
});

finder.on('error', err => {
	console.error(`Global Error ${err}`);
});

console.log(editorconfig);

finder.startSearch();
