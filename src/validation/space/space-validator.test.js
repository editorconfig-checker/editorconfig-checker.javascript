import validate from './space-validator';

test('should return true if text starts directly no matter of indent_style', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if line is empty', () => {
	const line = '';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if line is empty but keep indent with lf', () => {
	const line = '    \n';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if line is empty but keep indent with cr', () => {
	const line = '    \r';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if line is empty but keep indent with crlf', () => {
	const line = '    \r\n';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if text starts directly no matter of indent_style', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if comment starts directly no matter of indent_style', () => {
	const line = '//Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if comment has the right amount of leftpadding space', () => {
	const line = '  //Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 2 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if its in middle ob a block comment', () => {
	const line = '   * Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 2 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if comment has the right amount of leftpadding space', () => {
	const line = '  /Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 2 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return false if text has not the right amount of leftpadding space', () => {
	const line = '   Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Not the right amount of left-padding spaces (found 3 expected multiple of 4)');
});

test('should return false if comment has not the right amount of leftpadding space', () => {
	const line = '   /Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Not the right amount of left-padding spaces (found 3 expected multiple of 4)');
});

test('should return false if text has left padding tabs', () => {
	const line = ' \tHello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation (only spaces expected)');
});

test('should return false if comment has left padding tabs', () => {
	const line = ' \t/Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation (only spaces expected)');
});

test('should return false if text has left padding tabs', () => {
	const line = '\tHello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation (only spaces expected)');
});

test('should return false if text has left padding tabs', () => {
	const line = '\t/Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation (only spaces expected)');
});

test('should return true if no indent_size is given', () => {
	const line = '   Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if indent_size is 0', () => {
	const line = '   Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 0 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return false string starts with tab and indent_size is 0', () => {
	const line = '\tHello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 0 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation (only spaces expected)');
});

test('should return false if string starts with tab and no indent_size is given', () => {
	const line = '\tHello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation (only spaces expected)');
});

test('should return false if html has wrong indent_size', () => {
	const line = '   <hello>';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Not the right amount of left-padding spaces (found 3 expected multiple of 4)');
});

test('should return true if html has correct indent_size', () => {
	const line = '    <hello>';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: 4 // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});
