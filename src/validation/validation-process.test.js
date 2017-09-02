import validateFile from './validation-processor'; // eslint-disable-line no-unused-vars

const filePath = `${process.cwd()}/src/index.js`;

test(`should return 0 for a valid file`, () => {
	const editorconfig = {};

	expect(validateFile(filePath, editorconfig)).toEqual(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	console.error = jest.fn();
	const editorconfig = {
		indent_style: 'space' // eslint-disable-line camelcase
	};

	expect(validateFile(filePath, editorconfig)).toBeGreaterThan(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	console.error = jest.fn();

	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validateFile(`${process.cwd()}/.travis.yml`, editorconfig)).toBeGreaterThan(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	console.error = jest.fn();
	const filePath = `${process.cwd()}/Build/TestFiles/ValidationProcessor/README.md`;

	const editorconfig = {
		trim_trailing_whitespace: 'true' // eslint-disable-line camelcase
	};

	expect(validateFile(filePath, editorconfig)).toEqual(2);
});
