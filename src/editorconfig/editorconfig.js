import path from 'path';
import minimatch from 'minimatch';
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
	} while (currentPath.includes(rootDir) && !editorconfig.root);

	return Object.keys(editorconfig)
		.filter(glob => minimatch(path.basename(filePath), glob))
		.map(glob => editorconfig[glob])
		.reduce((acc, curr) => Object.assign({}, acc, curr), {});
};

export default getEditorconfigForFile;
