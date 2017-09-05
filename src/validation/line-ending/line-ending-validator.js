import getEndOfLineChar from '../../utils/line-ending-utils';

const validate = (fileContent, editorconfig) => {
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
			return 'Wrong line endings or new final newline';
		}
	}

	return '';
};

export default validate;
