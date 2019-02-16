// Deep merging of objects
// https://stackoverflow.com/a/34749873/4082431

const isObject = item => {
	return (item && typeof item === 'object' && !Array.isArray(item));
};

const mergeDeep = (target, ...sources) => {
	if (sources.length === 0) {
		return target;
	}

	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) {
					Object.assign(target, {[key]: {}});
				}

				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, {[key]: source[key]});
			}
		}
	}

	return mergeDeep(target, ...sources);
};

export default mergeDeep;
