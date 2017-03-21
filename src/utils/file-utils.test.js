import {editorconfigPath, fileExists} from './file-utils';

test('editorconfig exist in project-root', () => {
	expect(fileExists(editorconfigPath())).toBeTruthy();
});

test('editorconfig does not exist in some other dir', () => {
	expect(fileExists('../' + editorconfigPath())).toBeFalsy();
});

test('editorconfigPath ends with .editorconfig', () => {
	const editorconfig = '.editorconfig';
	const editorconfigPathString = editorconfigPath();
	const editorconfigPathEnd = editorconfigPathString.substring(editorconfigPathString.length - editorconfig.length);

	expect(editorconfigPathEnd).toEqual('.editorconfig');
});
