const puppeteer = require("puppeteer");
const login = require("./components/login");
const login_seb = require("./components/login.js");
const rescheduler = require("./components/rescheduler.js");
const getTime = require("./components/time");
const { username, pcn } = require("./settings");

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 10,
		args: ["--no-sandbox"]
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 4500 });

	await login_seb(page, pcn);

	const time = await getTime();

	await rescheduler(page, time);
})();
