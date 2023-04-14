class LocalStorageService {
	constructor(token) {
		this.token = token;
	}

	get() {
		return localStorage.getItem(this.token);
	}

	set(value) {
		localStorage.setItem(this.token, value);
	}

	remove() {
		localStorage.removeItem(this.token);
	}
}
export const tokenStorage = new LocalStorageService("token");
export const expirationTimeStorage = new LocalStorageService("expirationTime");
