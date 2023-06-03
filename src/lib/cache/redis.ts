import Redis from 'ioredis';
import type {} from 'ioredis';
import { REDIS_ENDPOINT_URL, REDIS_PASSWORD, REDIS_USERNAME } from '$env/static/private';

export const WEATHER_COORDS_KEY = 'weather_coords';

export let redis: any = null;

try {
	redis = new Redis({
		host: REDIS_ENDPOINT_URL,
		name: REDIS_USERNAME,
		password: REDIS_PASSWORD,
		port: 10772,
		showFriendlyErrorStack: true
	});
} catch (error) {
	console.error('Unable to connect to Redis.', error);
}
