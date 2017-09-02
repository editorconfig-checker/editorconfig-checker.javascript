import getEditorconfigForFile from './editorconfig';

const basePath = './Build/TestFiles/Editorconfig/';
const getEditorconfig = filePath => getEditorconfigForFile(`${basePath}${filePath}`);

test(`should get basic rules`, () => {
	const editorconfig = getEditorconfig('someFile.js');

	const expected = {
		indent_size: '4' // eslint-disable-line camelcase
	};

	expect(editorconfig).toEqual(expected);
});
