declare global {
	interface Window {
		ethereum: any;
	}
}

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
}