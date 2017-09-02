import {error} from '../../logger/logger';

const validate = (line, lineNumber, filePath, editorconfig) => {
	if (editorconfig.trim_trailing_whitespace) {
		if (line.endsWith(' ') || line.endsWith('\t')) {
			error(`Trailing Whitespace in ${filePath} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
};

export default validate;
