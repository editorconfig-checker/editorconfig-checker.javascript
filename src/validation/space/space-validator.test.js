import validate from './space-validator';

test('should return true if text starts directly no matter of indent_style', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if line is empty', () => {
	const line = '';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if text starts directly no matter of indent_style', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if comment starts directly no matter of indent_style', () => {
	const line = '//Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if comment has the right amount of leftpadding space', () => {
	const line = '  //Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 2
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if its in middle ob a block comment', () => {
	const line = '   * Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 2
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if comment has the right amount of leftpadding space', () => {
	const line = '  /Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 2
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return false if text has not the right amount of leftpadding space', () => {
	console.error = jest.fn();
	const line = '   Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return false if comment has not the right amount of leftpadding space', () => {
	console.error = jest.fn();
	const line = '   /Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return false if text has left padding tabs', () => {
	console.error = jest.fn();
	const line = ' \tHello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return false if comment has left padding tabs', () => {
	console.error = jest.fn();
	const line = ' \t/Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return false if text has left padding tabs', () => {
	console.error = jest.fn();
	const line = '\tHello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return false if text has left padding tabs', () => {
	console.error = jest.fn();
	const line = '\t/Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return true if no indent_size is given', () => {
	const line = '   Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space'
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if indent_size is 0', () => {
	const line = '   Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 0
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return false string starts with tab and indent_size is 0', () => {
	const line = "\tHello";
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 0
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
});

test('should return false if string starts with tab and no indent_size is given', () => {
	const line = "\tHello";
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space'
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
});
