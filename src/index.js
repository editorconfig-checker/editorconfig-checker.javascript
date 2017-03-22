import iniparser from 'iniparser';
import FindFiles from 'node-find-files';

import {fileExists, filterFiles, editorconfigPath} from './utils/file-utils';

// No editorconfig no fun
!fileExists(editorconfigPath()) && (console.error(`ERROR: no .editorconfig found: ${editorconfigPath()}`) || process.exit(1));

const editorconfig = iniparser.parseSync(editorconfigPath());

const filterOptions = '.*index.js$';

const finder = new FindFiles({
	rootFolder: process.cwd() + '/src',
	filterFunction: (file, stat) => stat.isFile() && filterFiles(file, filterOptions)
});

finder.on('match', (strPath, stat) => {
    console.log(strPath);
});

finder.on("patherror", function(err, strPath) {
    console.log("Error for Path " + strPath + " " + err)  // Note that an error in accessing a particular file does not stop the whole show
});
finder.on("error", function(err) {
    console.log("Global Error " + err);
});

finder.startSearch();
