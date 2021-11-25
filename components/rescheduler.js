module.exports = async (page, time) => {
	const { date, clock } = time;
	const juhiLoaToatlemine = await page.waitForSelector("#j_idt108\\:esmaseVoiKatTousuTaotlusBtn");

	await juhiLoaToatlemine.click();

	const muudaValiku = await page.waitForSelector('a[id*="reactivate"]');

	const currentData = await page.evaluate(() => {
		// const current = document.querySelector(".bullet-sub-complete > p").innerHTML;
		const current = document.querySelector(
			"#j_idt134\\:mainContent > div:nth-child(5) > div > p:nth-child(1)"
		).innerHTML;
		const dataString = current.split(",")[1].split("<")[0];
		const curTime = dataString.substr(-6, 5);
		const curDate = dataString.substr(-17, 10);
		const curCity = dataString.split(" ")[1].split(":")[0];
		return { curDate, curTime, curCity };
	});

	await muudaValiku.click();

	const listOfTimes = await page.waitForSelector(
		"table > tbody > tr > td > div > div:nth-of-type(1) > p:nth-of-type(2) > a"
	);

	await listOfTimes.click();

	//Checks list and creates a array of raw strings
	await page.waitForSelector('a[id*="varaseimadEksamiajadForm"] strong');
	const selectedData = await page.evaluate(() => {
		let array = [];
		const element = document.querySelectorAll('a[id*="varaseimadEksamiajadForm"]').forEach(el => {
			console.log(el);
			array.push(el.textContent);
		});
		return array;
	});

	//Maps through the last array and creates a new array of objects
	const newArray = selectedData.map(el => {
		if (el === "Sulgen") return;

		const date = el.substr(9, 10);
		const time = el.substr(28, 5);
		const city = el.substr(42).split(" ")[0];

		return { date, time, city };
	});

	console.log("Vabad ajad:", newArray);
	console.log("Kuupaev:", date);
	console.log("Praegune aeg:", currentData);
};
