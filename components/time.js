module.exports = () => {
	let today = new Date();
	const dd = String(today.getDate()).padStart(2, "0");
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const yyyy = today.getFullYear();
	const [h, m] = [today.getHours(), today.getMinutes()];

	const addDigit = time => (time < 10 ? `0${time}` : time);

	const time = `${addDigit(h)}:${addDigit(m)}`;
	const currentTime = { date: `${dd}.${mm}.${yyyy}`, time };

	return currentTime;
};
