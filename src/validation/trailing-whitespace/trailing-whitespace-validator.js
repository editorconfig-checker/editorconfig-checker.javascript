const validate = (line, lineNumber, editorconfig) => {
	if (editorconfig.trim_trailing_whitespace) {
		if (line.endsWith(' ') || line.endsWith('\t')) {
			return `${lineNumber}: Trailing Whitespace`;
		}
	}

	return '';
};

export default validate;
