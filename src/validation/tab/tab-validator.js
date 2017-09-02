import {error} from '../../logger/logger';

const validate = (line, lineNumber, filePath, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'tab') {
		// Starts with tab character * (none, one or more)
		// and everything but whitespace or space and * (block comment)
		if (!line.match(/^\t*([^\s]+| \*)/)) {
			error(`Mixed indentation in ${filePath} on line ${lineNumber}`);
			return false;
		}
	}

	return true;
};

export default validate;
