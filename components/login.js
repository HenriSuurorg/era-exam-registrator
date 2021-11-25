module.exports = async (page, pcn) => {
	console.log("Logging in...");
	console.log("Note: if no messages appear in the timespan of one minute, rerun the program.");

	await page.goto("http://www.eteenindus.mnt.ee/main.jsf", {
		waitUntil: "networkidle2",
		timeout: 20000
	});

	await page.waitFor(1500);
	await page.click(".ui-button.btn-login");
	console.log("Button clicked");

	const personalCode = await page.waitForSelector(".c-tab-login__nav-link");
	await page.waitFor(1500);

	await page.evaluate(() => document.querySelectorAll(".c-tab-login__nav-link")[3].click());

	await page.type("#sid-personal-code", pcn);

	await page.evaluate(() => document.querySelector("#smartIdForm").submit());
	console.log("A message has been sent to your mobile phone...");

	await page.waitForSelector(".ui-menuitem-text", { timeout: 0 });

	console.log("Login successful!");
};
