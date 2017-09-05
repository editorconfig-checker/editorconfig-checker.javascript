import validate from './line-ending-validator';

test('should return true for a file without line breaks(lf)', () => {
	const fileContent = 'Hello';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('');
});

test('should return true for a file without line breaks(cr)', () => {
	const fileContent = 'Hello';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('');
});

test('should return true for a file without line breaks(crlf)', () => {
	const fileContent = 'Hello';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('');
});

test('should return true for a valid file(lf)', () => {
	const fileContent = 'Hello\n';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('');
});

test('should return true for a valid file(cr)', () => {
	const fileContent = 'Hello\r';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('');
});

test('should return true for a valid file(crlf)', () => {
	const fileContent = 'Hello\r\n';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('');
});

test('should return false for an invalid file(lf)', () => {
	const fileContent = 'Hello\r';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});

test('should return false for an invalid file(cr)', () => {
	const fileContent = 'Hello\n';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});

test('should return false for an invalid file(crlf)', () => {
	const fileContent = 'Hello\n';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});

test('should return false for an invalid file(crlf)', () => {
	const fileContent = 'Hello\r';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});

test('should return false for mixed file(lf)', () => {
	const fileContent = 'Hello\rworld\ndude\n';
	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});

test('should return false for mixed file(cr)', () => {
	const fileContent = 'Hello\rworld\ndude\n';
	const editorconfig = {
		end_of_line: 'cr' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});

test('should return false for mixed file(crlf)', () => {
	const fileContent = 'Hello\rworld\r\ndude\n';
	const editorconfig = {
		end_of_line: 'crlf' // eslint-disable-line camelcase
	};

	expect(validate(fileContent, editorconfig)).toEqual('Wrong line endings or new final newline');
});
