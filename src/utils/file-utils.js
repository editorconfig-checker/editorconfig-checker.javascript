import fs from 'fs';

// Not exported
const filterDotfiles = (filePath, dots) => dots || !(filePath.indexOf('.') === 0 || filePath.includes('/.'));

// Exported
const editorconfigPath = () => `${process.cwd()}/.editorconfig`;
const fileExists = filePath => fs.existsSync(filePath);
const filterFiles = (filePath, filterOptions) => !filePath.match(filterOptions.regex) && filterDotfiles(filePath, filterOptions.dots);
const fileNotEmpty = stat => stat.isFile() && stat.size !== 0;

export {fileExists, fileNotEmpty, filterFiles, editorconfigPath};
