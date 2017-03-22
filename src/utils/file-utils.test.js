import {fileExists, filterFiles, editorconfigPath} from './file-utils';

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

test('should return true when not matching file', () => {
	expect(filterFiles('/some/path/index.js', 'notIndex.js$')).toBeTruthy();
});

test('should return false when matching file', () => {
	expect(filterFiles('/some/path/index.js', 'index.js$')).toBeFalsy();
});
