import {error} from '../../logger/logger';

const validate = (line, lineNumber, file, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'tab') {
		if (line.match(/^(\t*)[\w\/]/)) {
			// TODO: Handling block comments(*)
			const indentSize = line.match(/^(\t*)[\w\/\*]/)[1].length;
			if (indentSize % editorconfig.indent_size !== 0 && line[indentSize] !== '*') {
				error(`Not the right amount of left-padding spaces in ${file} on line ${lineNumber}`);
				return false;
			}
		}

		if (!line.match(/^\t*[\w\/\*]/)) {
			error(`Mixed indentation in ${file} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
}

export default validate;
