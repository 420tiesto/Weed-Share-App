export const getStorageValue = (key: string) => {
	return localStorage.getItem(key);
};

export const setStorageValue = (key: string, value: any) => {
	if (!key) {
		return;
	}
	if (!value) {
		return;
	}
	if (typeof value === "string") {
		localStorage.setItem(key, value);
	} else {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const removeStorageValue = (key: string) => {
	if (!key) {
		return;
	}
	localStorage.removeItem(key);
};
