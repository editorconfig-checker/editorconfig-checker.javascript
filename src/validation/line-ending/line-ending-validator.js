import {error} from '../../logger/logger';

import getEndOfLineChar from '../../utils/line-ending-utils';

const validate = (line, lineNumber, filePath, editorconfig) => {
	if (editorconfig.end_of_line) {
		const eolChar = getEndOfLineChar(editorconfig.end_of_line);
	}

	return true;
}

export default validate;
