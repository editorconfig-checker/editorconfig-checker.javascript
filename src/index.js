import iniparser from 'iniparser';
import FindFiles from 'node-find-files';

import {fileExists, filterFiles, editorconfigPath} from './utils/file-utils';

// No editorconfig no fun
!fileExists(editorconfigPath()) && (console.error(`ERROR: no .editorconfig found: ${editorconfigPath()}`) || process.exit(1));

const editorconfig = iniparser.parseSync(editorconfigPath());

const filterOptions = {
	regex: '.*index.js$'
}

const finder = new FindFiles({
	rootFolder: 'src',
	filterFunction: (file, stat) => stat.isFile() && filterFiles(file, filterOptions)
});

finder.on('match', (strPath, stat) => {
	console.log(strPath);
	console.log(stat);
});

finder.on('patherror', (err, strPath) => {
	console.log(`Error for Path ${strPath} ${err}`);
});

finder.on('error', err => {
	console.log(`Global Error ${err}`);
});

console.log(editorconfig);

finder.startSearch();
