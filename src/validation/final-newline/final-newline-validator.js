import {error} from '../../logger/logger';
import getEndOfLineChar from '../../utils/line-ending-utils';

const validate = (fileContent, filePath, editorconfig) => {
	if (editorconfig.end_of_line) {
		const eolChar = getEndOfLineChar(editorconfig.end_of_line);
		const fileContentArray = fileContent.split(eolChar);
		const lastLine = fileContentArray[fileContentArray.length - 1];

		if (!(lastLine.length === 0)) {
			error(`No final newline in ${filePath}`);
			return false;
		}
	}

	return true;
};

export default validate;
