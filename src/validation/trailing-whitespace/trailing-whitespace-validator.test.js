import validate from './trailing-whitespace-validator';

test('should return true if trim_trailing_whitespace is set to false and string dont contain trailing whitespace', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const filePath = 'sample.txt';
	const editorconfig = {
		trim_trailing_whitespace: false
	};

	expect(validate(line,lineNumber, filePath, editorconfig)).toBeTruthy();
});

test('should return true if trim_trailing_whitespace is set to false and string has trailing whitespace(space)', () => {
	const line = 'Hello ';
	const lineNumber = 1;
	const filePath = 'sample.txt';
	const editorconfig = {
		trim_trailing_whitespace: false
	};

	expect(validate(line,lineNumber, filePath, editorconfig)).toBeTruthy();
});

test('should return true if trim_trailing_whitespace is set to false and string has trailing whitespace(tab)', () => {
	const line = 'Hello\t';
	const lineNumber = 1;
	const filePath = 'sample.txt';
	const editorconfig = {
		trim_trailing_whitespace: false
	};

	expect(validate(line,lineNumber, filePath, editorconfig)).toBeTruthy();
});

test('should return true if trim_trailing_whitespace is set to false and string has no trailing whitespace', () => {
	const line = 'You will die';
	const lineNumber = 1;
	const filePath = 'sample.txt';
	const editorconfig = {
		trim_trailing_whitespace: true
	};

	expect(validate(line,lineNumber, filePath, editorconfig)).toBeTruthy();
});

test('should return false if trim_trailing_whitespace is set to true and string has trailing whitespace(tab)', () => {
	console.error = jest.fn();
	const line = 'Hello\t';
	const lineNumber = 1;
	const filePath = 'sample.txt';
	const editorconfig = {
		trim_trailing_whitespace: true
	};

	expect(validate(line,lineNumber, filePath, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});

test('should return false if trim_trailing_whitespace is set to true and string has trailing whitespace(space)', () => {
	console.error = jest.fn();
	const line = 'Hello ';
	const lineNumber = 1;
	const filePath = 'sample.txt';
	const editorconfig = {
		trim_trailing_whitespace: true
	};

	expect(validate(line,lineNumber, filePath, editorconfig)).toBeFalsy();
	expect(console.error).toBeCalled();
});
