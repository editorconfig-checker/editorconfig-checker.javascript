import getEditorconfigForFile from './editorconfig';

const basePath = './Build/TestFiles/Editorconfig/';
const getEditorconfig = filePath => getEditorconfigForFile(`${basePath}${filePath}`);

test(`should get basic rules`, () => {
	const editorconfig = getEditorconfig('someFile.js');

	const expected = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: '4' // eslint-disable-line camelcase
	};

	expect(editorconfig).toEqual(expected);
});

test(`should get basic rules`, () => {
	const editorconfig = getEditorconfig('someFile.php');

	const expected = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: '2' // eslint-disable-line camelcase
	};

	expect(editorconfig).toEqual(expected);
});

test(`should compose rules`, () => {
	const editorconfig = getEditorconfig('1/someFile.js');

	const expected = {
		indent_style: 'space', // eslint-disable-line camelcase
		indent_size: '4', // eslint-disable-line camelcase
		trim_trailing_whitespace: 'true' // eslint-disable-line camelcase
	};

	expect(editorconfig).toEqual(expected);
});
