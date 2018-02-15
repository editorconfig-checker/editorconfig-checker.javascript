const getEndOfLineChar = endOfLine => {
	let eolChar = '';
	if (endOfLine === 'lf') {
		eolChar = '\n';
	} else if (endOfLine === 'cr') {
		eolChar = '\r';
	} else if (endOfLine === 'crlf') {
		eolChar = '\r\n';
	}

	return eolChar;
};

export default getEndOfLineChar;
