import path from "path";
import puppeteer from "puppeteer-core";
import { siteInfo } from "../config/site";

console.log("siteInfo: ", siteInfo);
// setInterval(() => {}, 1000);
run();

async function run() {
  const { page, browser } = await createPage();

  const arr = siteInfo;
  for (const item of arr) {
    await page.goto(item.href);

    // await sleep(1000);
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const filename = path.join(__dirname, "../public", item.src);

    await page.screenshot({ path: filename });
  }

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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
