import getEndOfLineChar from '../../utils/line-ending-utils';

const validate = (fileContent, editorconfig) => {
	if (editorconfig.insert_final_newline === 'true' && editorconfig.end_of_line) {
		const eolChar = getEndOfLineChar(editorconfig.end_of_line);
		const fileContentArray = fileContent.split(eolChar);
		const lastLine = fileContentArray[fileContentArray.length - 1];

		if (!(lastLine.length === 0)) {
			return 'Wrong line endings or new final newline';
		}
	}

	return '';
};

export default validate;
