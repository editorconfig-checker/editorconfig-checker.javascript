import validate from './tab-validator';

test('should return true if text starts directly no matter of indent_style', () => {
	const line = 'Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if text starts after one tab', () => {
	const line = '	Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return false if text starts after space', () => {
	const line = ' Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation');
});

test('should return true if is comment', () => {
	const line = '//Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return true if line is empty', () => {
	const line = '';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('');
});

test('should return false if mixed indentation', () => {
	const line = '	  	Hello';
	const lineNumber = 1;
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validate(line, lineNumber, editorconfig)).toEqual('1: Mixed indentation');
});
