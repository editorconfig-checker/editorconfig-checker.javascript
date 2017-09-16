import fs from 'fs';

// Not exported
const filterDotfiles = (filePath, dots) => dots || !(filePath.indexOf('.') === 0 || filePath.includes('/.'));

// Exported
const editorconfigPath = () => `${process.cwd()}/.editorconfig`;
const fileExists = filePath => fs.existsSync(filePath);
const filterFiles = (filePath, filterOptions) => (!filePath.match(filterOptions['exclude-regexp']) || filterOptions['exclude-regexp'] === '') && filterDotfiles(filePath, filterOptions.dots);
const fileNotEmpty = stat => stat.isFile() && stat.size !== 0;
const isDirectory = filePath => fs.lstatSync(filePath).isDirectory();
const isFile = filePath => fs.lstatSync(filePath).isFile();

export {fileExists, fileNotEmpty, filterFiles, editorconfigPath, isFile, isDirectory};
