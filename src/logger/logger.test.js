import {log, info, error} from './logger';

test(`log should call console.log();`, () => {
	console.log = jest.fn();
	log('some log;');
	expect(console.log).toBeCalled();
});

test(`info should call console.log();`, () => {
	console.log = jest.fn();
	info('some log;');
	expect(console.log).toBeCalled();
});

test(`error should call console.error`, () => {
	console.error = jest.fn();
	error('some log;');
	expect(console.error).toBeCalled();
});
