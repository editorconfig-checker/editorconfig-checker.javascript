const log = msg => {
	// Green
	console.log('\u001B[32m%s\u001B[0m', msg);
};

const info = msg => {
	// Yellow
	console.log('\u001B[33m%s\u001B[0m', msg);
};

const error = msg => {
	// Red
	console.error('\u001B[31m%s\u001B[0m', msg);
};

export {log, info, error};
