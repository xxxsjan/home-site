const path = require("path");
const puppeteer = require("puppeteer-core");

setInterval(() => {}, 1000);

run();

async function run() {
  const { page, browser } = await createPage();

  const arr = [
    {
      url: "https://web-tool.dolam.fun",
      filename: "web-tool.png",
    },
    {
      url: "https://blog.dolam.fun",
      filename: "blog.png",
    },
    {
      url: "https://www.jianshu.com/u/2b406a3be47b",
      filename: "jianshu.png",
    },
    {
      url: "https://chat-gpt-next-web-tau-silk-44.vercel.app",
      filename: "chat.png",
    },
  ];
  for (const item of arr) {
    await page.goto(item.url);

    await sleep(1000);

    const filename = path.join(__dirname, "../public", item.filename);

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
