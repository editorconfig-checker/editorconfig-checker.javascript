import validateFile from './validation-processor'; // eslint-disable-line no-unused-vars

console.error = jest.fn();

const filePath = `${process.cwd()}/src/index.js`;

test(`should return 0 for a valid file`, () => {
	const editorconfig = {};

	expect(validateFile(filePath, editorconfig).length).toEqual(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	const editorconfig = {
		indent_style: 'space' // eslint-disable-line camelcase
	};

	expect(validateFile(filePath, editorconfig).length).toBeGreaterThan(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	const editorconfig = {
		indent_style: 'tab' // eslint-disable-line camelcase
	};

	expect(validateFile(`${process.cwd()}/.travis.yml`, editorconfig).length).toBeGreaterThan(0);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	const filePath = `${process.cwd()}/Build/TestFiles/ValidationProcessor/README.md`;

	const editorconfig = {
		trim_trailing_whitespace: 'true' // eslint-disable-line camelcase
	};

	expect(validateFile(filePath, editorconfig).length).toEqual(2);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	const filePath = `${process.cwd()}/Build/TestFiles/ValidationProcessor/noFinalNewline.js`;

	const editorconfig = {
		end_of_line: 'lf', // eslint-disable-line camelcase
		insert_final_newline: 'true' // eslint-disable-line camelcase
	};

	expect(validateFile(filePath, editorconfig).length).toEqual(1);
});

test(`should return an integer greater 0 for an invalid file`, () => {
	const filePath = `${process.cwd()}/Build/TestFiles/ValidationProcessor/wrongLineEnding.js`;

	const editorconfig = {
		end_of_line: 'lf' // eslint-disable-line camelcase
	};

	expect(validateFile(filePath, editorconfig).length).toEqual(1);
});
