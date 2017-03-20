import editorconfigExists from './file-utils';

test('editorconfig exist in project-root', () => {
	const cwd = process.cwd();
	expect(editorconfigExists(cwd)).toBeTruthy();
});

test('editorconfig does not exist in Build dir', () => {
	const cwd = process.cwd() + '/Build';
	expect(editorconfigExists(cwd)).toBeFalsy();
});
