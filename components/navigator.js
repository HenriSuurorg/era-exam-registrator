const { examination_type } = require("./settings");

module.exports = async page => {
	await page.goto("https://eteenindus.mnt.ee/pages/juht/juhiloataotlus/juhiloaTaotlus.jsf", {
		waitUntil: "networkidle2",
		timeout: 20000
	});

	if (examination_type === "driving") {
		// Needs improvement
		console.log("Opening driving exam times...");
		await page.click("#j_idt134:j_idt172:reactivate");
		const availableTimesBtn = await page.waitForSelector("#j_idt134:j_idt172:j_idt182");
		availableTimesBtn.click();

		await page.evaluate(() => {
			const availableTimes = document.querySelector("#varasweimadEksamiajadForm > ul").children;

			for (const time of times) {
				const city = time.textContent.slice(40, 48).trim();
			}
		});
	} else if (examination_type === "theory") {
		console.log("Opening theory exam times...");
	}
};
