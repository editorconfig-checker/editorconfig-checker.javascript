import path from 'path';
import iniparser from 'iniparser';
import {fileExists} from '../utils/file-utils';

const getEditorconfigForFile = filePath => {
	const rootDir = process.cwd();
	const fullPath = `${rootDir}/${filePath}`;

	let currentPath = path.dirname(fullPath);
	let editorconfig = {};

	do {
		const editorconfigPath = `${currentPath}/.editorconfig`;
		if (fileExists(editorconfigPath)) {
			editorconfig = Object.assign({}, iniparser.parseSync(editorconfigPath), editorconfig);
		}
		currentPath = path.dirname(currentPath);
	} while (currentPath.includes(rootDir));

	return editorconfig;
};

export default getEditorconfigForFile;
