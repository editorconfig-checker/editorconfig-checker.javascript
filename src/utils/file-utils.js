import fs from 'fs';

const editorconfigExists = cwd => fs.existsSync(cwd + '/.editorconfig');

export default editorconfigExists;
