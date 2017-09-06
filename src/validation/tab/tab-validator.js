const validate = (line, lineNumber, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'tab') {
		// Starts with tab character * (none, one or more)
		// and everything but whitespace or space and * (block comment)
		if (!line.match(/^\t*([^\s]+| \*)/)) {
			return `${lineNumber}: Mixed indentation (only tabs expected)`;
		}
	}

	return '';
};

export default validate;
