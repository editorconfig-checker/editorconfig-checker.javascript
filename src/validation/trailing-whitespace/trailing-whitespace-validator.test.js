import validate from './trailing-whitespace-validator';

test('should return true if trim_trailing_whitespace is set to false and string dont contain trailing whitespace', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const editorconfig = {
		trim_trailing_whitespace: 'false' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if trim_trailing_whitespace is set to false and string has trailing whitespace(space)', () => {
	const line = 'Hello ';
	const lineNumber = 1;
	const editorconfig = {
		trim_trailing_whitespace: 'false' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if trim_trailing_whitespace is set to false and string has trailing whitespace(tab)', () => {
	const line = 'Hello\t';
	const lineNumber = 1;
	const editorconfig = {
		trim_trailing_whitespace: 'false' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if trim_trailing_whitespace is set to false and string has no trailing whitespace', () => {
	const line = 'You will die';
	const lineNumber = 1;
	const editorconfig = {
		trim_trailing_whitespace: 'true' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return false if trim_trailing_whitespace is set to true and string has trailing whitespace(tab)', () => {
	const line = 'Hello\t';
	const lineNumber = 1;
	const editorconfig = {
		trim_trailing_whitespace: 'true' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Trailing Whitespace');
});

test('should return false if trim_trailing_whitespace is set to true and string has trailing whitespace(space)', () => {
	const line = 'Hello ';
	const lineNumber = 1;
	const editorconfig = {
		trim_trailing_whitespace: 'true' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Trailing Whitespace');
});
