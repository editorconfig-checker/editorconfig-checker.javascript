import validate from './final-newline-validator';

const filePath = 'someFile.js';

/* eslint-disable camelcase */

test('should return true for an empty file (lf)', () => {
	const editorconfig = {
		end_of_line: 'lf'
	};
	const fileContent = '';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeTruthy();
});

test('should return true if final newline is set (lf)', () => {
	const editorconfig = {
		end_of_line: 'lf'
	};
	const fileContent = 'hello\nworld\n';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeTruthy();
});

test('should return false if final newline is not set (lf)', () => {
	console.error = jest.fn();
	const editorconfig = {
		end_of_line: 'lf'
	};
	const fileContent = 'hello\nworld';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeFalsy();
});

test('should return true for an empty file (cr)', () => {
	const editorconfig = {
		end_of_line: 'cr'
	};
	const fileContent = '';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeTruthy();
});

test('should return true if final newline is set (cr)', () => {
	const editorconfig = {
		end_of_line: 'cr'
	};
	const fileContent = 'hello\rworld\r';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeTruthy();
});

test('should return false if final newline is not set (cr)', () => {
	console.error = jest.fn();
	const editorconfig = {
		end_of_line: 'cr'
	};
	const fileContent = 'hello\rworld';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeFalsy();
});

test('should return true for an empty file (crlf)', () => {
	const editorconfig = {
		end_of_line: 'crlf'
	};
	const fileContent = '';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeTruthy();
});

test('should return true if final newline is set (crlf)', () => {
	const editorconfig = {
		end_of_line: 'crlf'
	};
	const fileContent = 'hello\r\nworld\r\n';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeTruthy();
});

test('should return false if final newline is not set (crlf)', () => {
	console.error = jest.fn();
	const editorconfig = {
		end_of_line: 'crlf'
	};
	const fileContent = 'hello\r\nworld';

	const result = validate(fileContent, filePath, editorconfig);

	expect(result).toBeFalsy();
});

/* eslint-enable camelcase */
