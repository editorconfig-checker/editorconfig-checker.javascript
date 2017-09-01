import getEndOfLineChar from './line-ending-utils';

test('get correct eol-char for lf', () => {
	expect(getEndOfLineChar('lf')).toBe('\n');
});

test('get correct eol-char for cr', () => {
	expect(getEndOfLineChar('cr')).toBe('\r');
});

test('get correct eol-char for crlf', () => {
	expect(getEndOfLineChar('crlf')).toBe('\r\n');
});

test('get empty string if endOfLine isnt supported', () => {
	expect(getEndOfLineChar('')).toBe('');
});
