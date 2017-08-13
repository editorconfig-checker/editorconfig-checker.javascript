import {error} from '../../logger/logger';

const validate = (line, lineNumber, file, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'space' && editorconfig.indent_size) {
		if (line.match(/^( *)[\w\/]/)) {
			const indentSize = line.match(/^( *)[\w\/\*]/)[1].length;
			if (indentSize % editorconfig.indent_size !== 0 && line[indentSize] !== '*') {
				error(`Not the right amount of left-padding spaces in ${file} on line ${lineNumber}`);
				return false;
			}
		}

		if (!line.match(/^ *[\w\/\*]/)) {
			error(`Mixed indentation in ${file} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
}

export default validate;
