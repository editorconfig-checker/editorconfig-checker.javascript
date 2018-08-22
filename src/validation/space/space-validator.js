const validate = (line, lineNumber, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'space') {
		if (editorconfig.indent_size) {
			// Check for space any number of times and then everything but
			// space or tab
			if (line.match(/^( *)[^ \t]/)) {
				const indentSize = line.match(/^( *)[^ \t]/)[1].length;
				if (indentSize % editorconfig.indent_size !== 0 && line[indentSize] !== '*') {
					return `${lineNumber}: Not the right amount of left-padding spaces (found ${indentSize} expected multiple of ${editorconfig.indent_size})`;
				}
			}
		}

		if (!line.match(/^ *[\S\r\n]+/)) {
			return `${lineNumber}: Mixed indentation (only spaces expected)`;
		}
	}

	return '';
};

export default validate;
