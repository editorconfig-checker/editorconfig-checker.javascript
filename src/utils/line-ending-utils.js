const getEndOfLineChar = endOfLine => {
	if (endOfLine === 'lf') {
		return '\n';
	} else if (endOfLine === 'cr') {
		return '\r';
	} else if (endOfLine === 'crlf') {
		return '\r\n';
	}

	return '';
};

export default getEndOfLineChar;
