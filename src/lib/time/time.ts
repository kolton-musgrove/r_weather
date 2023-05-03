function roundMinutes(date: Date) {
	date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
	date.setMinutes(0);

	return date;
}

export function getCurrentHour(): number {
	return roundMinutes(new Date()).getHours();
}
