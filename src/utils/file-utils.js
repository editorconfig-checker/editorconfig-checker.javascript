import fs from 'fs';

const editorconfigPath = () => `${process.cwd()}/.editorconfig`;
const fileExists = file => fs.existsSync(file);

export {fileExists, editorconfigPath};
