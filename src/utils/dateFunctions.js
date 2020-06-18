export const getDate = (date, includeYear = true, includeWeekDay = false) => {
	const dateFormat = new Date(date);
	const day = dateFormat.getDate();
	const year = dateFormat.getFullYear();

	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	][dateFormat.getMonth()];

	return `${month}/${(day < 10 && "0") + day}${includeYear ? `/${year}` : ""}${
		includeWeekDay ? " - " + getWeekDay(date) : ""
	}`;
};

export const getWeekDay = (date) => {
	const dateFormat = new Date(date);
	return [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	][dateFormat.getDay()];
};

export const getTime = (date) => {
	const dateFormat = new Date(date);
	const hour = dateFormat.getHours();
	const min = dateFormat.getMinutes();

	return `${(hour < 10 && "0") + hour > 12 ? hour - 12 : hour}:${(min < 10 &&
		"0") + min}${hour > 12 ? "pm" : "am"}`;
};

export default {
	getDate,
	getWeekDay,
	getTime,
};
