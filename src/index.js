import iniparser from 'iniparser';
import FindFiles from 'node-find-files';

import {fileExists, editorconfigPath} from './utils/file-utils';

// No editorconfig no fun
!fileExists(editorconfigPath()) && (console.error(`ERROR: no .editorconfig found: ${editorconfigPath()}`) || process.exit(1));

const editorconfig = iniparser.parseSync(editorconfigPath());

const finder = new FindFiles({
	rootFolder: process.cwd() + '/src',
	filterFunction: (path, stat) => {
		return stat.isFile();
	}
});

finder.on('match', (strPath, stat) => {
    console.log(strPath);
});

finder.startSearch();
