import {error} from '../../logger/logger';

import getEndOfLineChar from '../../utils/line-ending-utils';

const validate = (fileContent, filePath, editorconfig) => {
	if (editorconfig.end_of_line) {
		const expectedEolChar = getEndOfLineChar(editorconfig.end_of_line);
		const expectedEols = fileContent.split(expectedEolChar).length;
		const lfEols = fileContent.split('\n').length;
		const crEols = fileContent.split('\r').length;
		const crlfEols = fileContent.split('\r\n').length;

		const isValid = (expectedEols, lfEols, crEols, crlfEols) => {
			return [lfEols, crEols, crlfEols].reduce((valid, eol) => {
				return valid && (eol === expectedEols || eol === 1);
			}, true);
		};

		if (!isValid(expectedEols, lfEols, crEols, crlfEols)) {
			error(`Not the right line ending in ${filePath}`);
			return false;
		}
	}

	return true;
};

export default validate;
