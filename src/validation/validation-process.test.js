import validateFile from './validation-processor'; // eslint-disable-line no-unused-vars

test(`should return 0 for a valid file`, () => {
	const editorconfig = {};

	expect(validateFile(`${process.cwd()}/src/index.js`, editorconfig)).toEqual(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	console.error = jest.fn();
	const editorconfig = {
		indent_style: 'space' // eslint-disable-line camelcase
	};

	expect(validateFile(`${process.cwd()}/src/index.js`, editorconfig)).toBeGreaterThan(0);
});
