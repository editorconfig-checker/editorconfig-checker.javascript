import validate from './line-ending-validator';

console.error = jest.fn();

test('should return true for a file without line breaks(lf)', () => {
	const fileContent = 'Hello';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeTruthy();
});

test('should return true for a file without line breaks(cr)', () => {
	const fileContent = 'Hello';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeTruthy();
});

test('should return true for a file without line breaks(crlf)', () => {
	const fileContent = 'Hello';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeTruthy();
});

test('should return true for a valid file(lf)', () => {
	const fileContent = 'Hello\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeTruthy();
});

test('should return true for a valid file(cr)', () => {
	const fileContent = 'Hello\r';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeTruthy();
});

test('should return true for a valid file(crlf)', () => {
	const fileContent = 'Hello\r\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeTruthy();
});

test('should return false for an invalid file(lf)', () => {
	const fileContent = 'Hello\r';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});

test('should return false for an invalid file(cr)', () => {
	const fileContent = 'Hello\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});

test('should return false for an invalid file(crlf)', () => {
	const fileContent = 'Hello\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});

test('should return false for an invalid file(crlf)', () => {
	const fileContent = 'Hello\r';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});

test('should return false for mixed file(lf)', () => {
	const fileContent = 'Hello\rworld\ndude\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});

test('should return false for mixed file(cr)', () => {
	const fileContent = 'Hello\rworld\ndude\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});

test('should return false for mixed file(crlf)', () => {
	const fileContent = 'Hello\rworld\r\ndude\n';
	const filePath = 'sample.txt';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, filePath, editorconfig)).toBeFalsy();
});
