import editorconfigExists from './utils/file-utils';

const cwd = process.cwd();

// No editorconfig no fun
!editorconfigExists(cwd) && console.error(`ERROR: no .editorconfig found in ${cwd}`) && process.exit(1);
