import fs from 'fs';

// Not exported
const filterDotfiles = (file, dots) => dots || !(file.indexOf('.') === 0 || file.includes('/.'));

// Exported
const editorconfigPath = () => `${process.cwd()}/.editorconfig`;
const fileExists = file => fs.existsSync(file);
const filterFiles = (file, filterOptions) => !file.match(filterOptions.regex) && filterDotfiles(file, filterOptions.dots);
const fileNotEmpty = stat => stat.isFile() && stat.size !== 0;

export {fileExists, fileNotEmpty, filterFiles, editorconfigPath};
