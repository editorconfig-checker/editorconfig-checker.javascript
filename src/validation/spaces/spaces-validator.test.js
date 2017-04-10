import validate from './spaces-validator';

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

test('should return true if text has the right amount of leftpadding space', () => {
	const line = '  Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 2
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return false if text has not the right amount of leftpadding space', () => {
	const line = '   Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
});

test('should return false if text has left padding tabs', () => {
	const line = ' \tHello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
});

test('should return false if text has left padding tabs', () => {
	const line = '\tHello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'space',
		indent_size: 4
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
});
