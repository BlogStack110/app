"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendUrl = exports.getRedisConfig = void 0;
const getRedisConfig = () => {
    if (process.env.REDISCACHE_URL && process.env.REDISCACHE_TOKEN) {
        return {
            url: process.env.REDISCACHE_URL,
            token: process.env.REDISCACHE_TOKEN,
        };
    }
    else {
        throw new Error("REDIS CREDENTIALS NOT FOUND!");
    }
};
exports.getRedisConfig = getRedisConfig;
exports.backendUrl = process.env.backendUrl;
