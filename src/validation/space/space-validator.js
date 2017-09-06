const validate = (line, lineNumber, editorconfig) => {
	if (line.length > 0 && editorconfig.indent_style === 'space') {
		if (editorconfig.indent_size) {
			if (line.match(/^( *)[\w/]/)) {
				const indentSize = line.match(/^( *)[\w/*]/)[1].length;
				if (indentSize % editorconfig.indent_size !== 0 && line[indentSize] !== '*') {
					return `${lineNumber}: Not the right amount of left-padding spaces (found ${indentSize} expected multiple of ${editorconfig.indent_size})`;
				}
			}
		}

		if (!line.match(/^ *[^\s]+/)) {
			return `${lineNumber}: Mixed indentation (only spaces expected)`;
		}
	}

	return '';
};

export default validate;
