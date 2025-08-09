export const getRedisConfig = () => {
	if (process.env.REDISCACHE_URL && process.env.REDISCACHE_TOKEN) {
		return {
			url: process.env.REDISCACHE_URL,
			token: process.env.REDISCACHE_TOKEN,
		};
	} else {
		throw new Error("REDIS CREDENTIALS NOT FOUND!");
	}
};
export const backendUrl = process.env.backendUrl;
