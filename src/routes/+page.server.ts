// import type { PageServerLoad } from './$types';
// import type { locationResponse } from '$lib/types';
// import { REV_GEOCODE_API_KEY } from '$env/static/private';

// export async function getLocation(latitude: number, longitude: number): Promise<string> {
// 	const endpoint: URL = new URL(
// 		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${REV_GEOCODE_API_KEY}`
// 	);

// 	const response = await fetch(endpoint);

// 	if (!response.ok) {
// 		throw new Error(response.statusText);
// 	}

// 	const data = (await response.json()) as locationResponse;

// 	return `${data.locality}`;
// }

// export const load = (async ({ fetch, params }) => {
// 	return {
// 		test: 'test'
// 	};
// }) satisfies PageServerLoad;
