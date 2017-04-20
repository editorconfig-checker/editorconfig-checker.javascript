import validate from './tab-validator';

test('should return true if text starts directly no matter of indent_style', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if text starts after one tab', () => {
	const line = '	Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return false if text starts after space', () => {
	console.error = jest.fn();
	const line = ' Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return true if is comment', () => {
	const line = '//Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return true if line is empty', () => {
	const line = '';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeTruthy();
});

test('should return false if mixed indentation', () => {
	console.error = jest.fn();
	const line = '	  	Hello';
	const lineNumber = 1;
	const file = 'sample.txt';
	const editorconfig = {
		indent_style: 'tab',
	};

	expect(validate(line,lineNumber, file, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});
