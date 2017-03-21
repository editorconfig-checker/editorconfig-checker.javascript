import iniparser from 'iniparser';

import {fileExists, editorconfigPath} from './utils/file-utils';

// No editorconfig no fun
!fileExists(editorconfigPath()) && (console.error(`ERROR: no .editorconfig found: ${editorconfigPath()}`) || process.exit(1));

iniparser.parse(editorconfigPath(), (err, data) => {
	if (err) {
		console.log( err );
	} else {
		console.log( data );
		console.log( editorconfigPath() );
	}
});
