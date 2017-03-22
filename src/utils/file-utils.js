import fs from 'fs';

const editorconfigPath = () => `${process.cwd()}/.editorconfig`;
const fileExists = file => fs.existsSync(file);
const filterFiles = (file, filterOptions) => !file.match(filterOptions.regex);

export {fileExists, filterFiles, editorconfigPath};
