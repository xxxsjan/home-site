const path = require("path");
const puppeteer = require("puppeteer-core");

setInterval(() => {}, 1000);

run();

async function run() {
  const { page, browser } = await createPage();

  const arr = [
    "https://www.jianshu.com/u/2b406a3be47b",
    "https://blog.dolam.fun",
    "https://web-tool.dolam.fun",
  ];
  await page.goto(arr[0]);

  const filename = path.join(__dirname, "../public", "jianshu.png");

  await page.screenshot({ path: filename });

  await browser.close();

  process.exit();
}
async function createPage() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  return { browser, page };
}
