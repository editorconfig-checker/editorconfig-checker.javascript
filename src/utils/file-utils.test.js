import fs from 'fs';
import {fileExists, fileNotEmpty, filterFiles, editorconfigPath, isDirectory, isFile} from './file-utils';

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

test('filterFiles should return true when not matching file', () => {
	const filterOptions = {
		'exclude-regexp': 'notIndex.js$',
		dots: true
	};

	expect(filterFiles('/some/path/index.js', filterOptions)).toBeTruthy();
});

test('filterFiles should return false when matching file', () => {
	const filterOptions = {
		regex: 'index.js$',
		dots: true
	};

	expect(filterFiles('/some/path/index.js', filterOptions)).toBeFalsy();
});

test('filterFiles should return true for dotfile when dotfile option is true', () => {
	const filterOptions = {
		'exclude-regexp': 'www',
		dots: true
	};

	expect(filterFiles('/some/path/.index.js', filterOptions)).toBeTruthy();
});

test('filterFiles should return true for dotfile when dotfile option is true and dotfile is in rootdir', () => {
	const filterOptions = {
		'exclude-regexp': 'www',
		dots: true
	};

	expect(filterFiles('.index.js', filterOptions)).toBeTruthy();
});

test('filterFiles should return false for dotfile when dotfile option is false', () => {
	const filterOptions = {
		regex: 'www',
		dots: false
	};

	expect(filterFiles('/some/path/.index.js', filterOptions)).toBeFalsy();
});

test('filterFiles should return false for dotfile when dotfile option is false and dotfile is in rootdir', () => {
	const filterOptions = {
		regex: 'www',
		dots: false
	};

	expect(filterFiles('.index.js', filterOptions)).toBeFalsy();
});

test('filterFiles should return false for dotfile when dotfile option is true and regex matches', () => {
	const filterOptions = {
		regex: 'index.js$',
		dots: false
	};

	expect(filterFiles('/some/path/.index.js', filterOptions)).toBeFalsy();
	expect(filterFiles('.index.js', filterOptions)).toBeFalsy();
});

test('fileNotEmpty should return true for src/index.js', () => {
	const stat = fs.statSync('src/index.js');

	expect(fileNotEmpty(stat)).toBeTruthy();
});

test('fileNotEmpty should return false for Build/TestFiles/emptyFile.js', () => {
	const stat = fs.statSync('Build/TestFiles/emptyFile.js');

	expect(fileNotEmpty(stat)).toBeFalsy();
});

test('isDirectory should return true for a directory', () => {
	expect(isDirectory('Build')).toBeTruthy();
});

test('isDirectory should return false for a file', () => {
	expect(isDirectory('package.json')).toBeFalsy();
});

test('isFile should return true for a file', () => {
	expect(isFile('package.json')).toBeTruthy();
});

test('isFile should return false for a folder', () => {
	expect(isFile('Build')).toBeFalsy();
});
