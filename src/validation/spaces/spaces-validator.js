import {error} from '../../logger/logger';

const validate = (line, lineNumber, file, editorconfig) => {
	if (editorconfig.indent_style === 'space') {
		if (editorconfig.indent_size) {
			if (line.match(/^( *)[\w\/]/)) {
				// TODO: Handling block comments(*)
				if (line.match(/^( *)[\w\/]/)[1].length % editorconfig.indent_size !== 0) {
					error(`Not the right amount of left-padding spaces in ${file} on line ${lineNumber}`);
					return false;
				}
			}
		}

		if (!line.match(/^ *[\w\/]/)) {
			error(`Mixed indentation in ${file} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
}

export default validate;
