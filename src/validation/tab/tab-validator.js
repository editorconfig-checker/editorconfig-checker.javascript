import {error} from '../../logger/logger';

const validate = (line, lineNumber, file, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'tab') {
		if (!line.match(/^\t*[\w\/\*]/)) {
			error(`Mixed indentation in ${file} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
}

export default validate;
