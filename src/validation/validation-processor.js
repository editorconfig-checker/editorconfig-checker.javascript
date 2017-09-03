import fs from 'fs';

import getEndOfLineChar from '../utils/line-ending-utils';

import validateTab from './tab/tab-validator';
import validateSpaces from './space/space-validator';
import validateTrailingWhitespace from './trailing-whitespace/trailing-whitespace-validator';
import validateFinalNewline from './final-newline/final-newline-validator';

const validateFile = (filePath, editorconfig) => {
	const fileContent = fs.readFileSync(filePath).toString();
	let fileContentArray = [];

	if (editorconfig.end_of_line) {
		fileContentArray = fileContent.split(getEndOfLineChar(editorconfig.end_of_line));
	} else {
		fileContentArray = fileContent.split('\n');
	}

	let errors = 0;

	fileContentArray.forEach((line, lineNumber) => {
		lineNumber++;
		if (!validateTab(line, lineNumber, filePath, editorconfig)) {
			errors++;
		}
		if (!validateSpaces(line, lineNumber, filePath, editorconfig)) {
			errors++;
		}
		if (!validateTrailingWhitespace(line, lineNumber, filePath, editorconfig)) {
			errors++;
		}
	});

	if (!validateFinalNewline(fileContent, filePath, editorconfig)) {
		errors++;
	}

	return errors;
};

export default validateFile;
