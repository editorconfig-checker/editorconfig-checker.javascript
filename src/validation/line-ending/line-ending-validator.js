import {error} from '../../logger/logger';

import getEndOfLineChar from '../../utils/line-ending-utils';

const validate = (line, lineNumber, filePath, editorconfig) => {
	if (editorconfig.end_of_line) {
		const eolChar = getEndOfLineChar(editorconfig.end_of_line);

		if (!eolChar) {
			error(`Not the right line ending in ${filePath} on line ${lineNumber}`);
		}
	}

	return true;
};

export default validate;
