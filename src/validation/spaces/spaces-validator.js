const validate = (line, lineNumber, file, editorconfig) => {
	if (editorconfig.indent_style === 'space') {
		if (editorconfig.indent_size) {
			if (line.match(/^( *)\w/)) {
				// Not the right amount
				// TODO: Handling block comments(*)
				return line.match(/^( *)\w/)[1].length % editorconfig.indent_size === 0;
			}
		}

		// If false mixed
		return line.match(/^ *\w/);
	}

	return true;
}

export default validate;
