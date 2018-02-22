import fs from 'fs';

import getEndOfLineChar from '../utils/line-ending-utils';

import validateTab from './tab/tab-validator';
import validateSpaces from './space/space-validator';
import validateTrailingWhitespace from './trailing-whitespace/trailing-whitespace-validator';
import validateFinalNewline from './final-newline/final-newline-validator';
import validateEndOfLine from './line-ending/line-ending-validator';

const validateFile = (filePath, editorconfig) => {
	const errors = [];
	const fileContent = fs.readFileSync(filePath).toString();
	let fileContentArray = [];

	const isLineDisabled = line => {
		return /editorconfig-disable-line/.test(line);
	};

	if (editorconfig.end_of_line) {
		fileContentArray = fileContent.split(getEndOfLineChar(editorconfig.end_of_line));
	} else {
		fileContentArray = fileContent.split('\n');
	}

	fileContentArray.forEach((line, lineNumber) => {
		lineNumber++;
		if (!isLineDisabled(line)) {
			errors.push(validateTab(line, lineNumber, editorconfig));
			errors.push(validateSpaces(line, lineNumber, editorconfig));
			errors.push(validateTrailingWhitespace(line, lineNumber, editorconfig));
		}
	});

	errors.push(validateEndOfLine(fileContent, editorconfig));
	errors.push(validateFinalNewline(fileContent, editorconfig));

	return errors.filter((error, index, errorArray) => error.length > 0 && errorArray.indexOf(error) === index);
};

export default validateFile;
