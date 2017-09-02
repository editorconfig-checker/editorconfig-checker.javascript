import fs from 'fs';

import validateTab from './tab/tab-validator';
import validateSpaces from './space/space-validator';
import validateTrailingWhitespace from './trailing-whitespace/trailing-whitespace-validator';

const validateFile = (filePath, editorconfig) => {
	const fileContent = fs.readFileSync(filePath).toString();
	const fileContentArray = fileContent.split('\n');

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

	return errors;
};

export default validateFile;
