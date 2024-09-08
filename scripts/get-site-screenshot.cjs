const path = require("path");
const puppeteer = require("puppeteer-core");

setInterval(() => {}, 1000);

run();

async function run() {
  const { page, browser } = await createPage();
  await page.goto("https://blog.dolam.fun/");

  const filename = path.join(__dirname, "image.jpg");

  await page.screenshot({ path: filename });

  await browser.close();
}
async function createPage() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  return { browser, page };
}
