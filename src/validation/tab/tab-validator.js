import {error} from '../../logger/logger';

const validate = (line, lineNumber, filePath, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'tab') {
		if (!line.match(/^\t*[\w\/\*]/)) {
			error(`Mixed indentation in ${filePath} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
}

export default validate;
