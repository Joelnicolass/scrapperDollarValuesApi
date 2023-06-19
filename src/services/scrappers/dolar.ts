import { chromium } from "playwright";
import { saveInJson } from "../../utils/files.utils";

export const scrapDollarValuesInArg = async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--disable-gpu-sandbox", "--single-process"],
  });

  const page = await browser.newPage();

  await page.goto("https://www.lanacion.com.ar/dolar-hoy", {
    timeout: 0,
  });

  const data = await page.evaluate(() => {
    const ul = document.querySelector(".dolar-subgroup ");

    const lis = ul?.querySelectorAll("li");

    const dollarValues = Array.from(lis!).map((li) => {
      const title = li.querySelector("h2")?.textContent;

      const data = li.querySelector("p");

      const raw = data?.textContent;
      const buyAndSell = raw?.split(/(?=[A-Z])/);
      const format = buyAndSell
        ?.map((item) => {
          const addSpace = item.replace(/\$/g, " $");
          const splitForSpace = addSpace.split(" ");
          const key = splitForSpace[0];
          const value = splitForSpace[1];

          return {
            [key]: value,
          };
        })
        .reduce((acc, item) => {
          return {
            ...acc,
            ...item,
          };
        }, {});

      return {
        title,
        ...format,
      };
    });

    return dollarValues;
  });

  saveInJson(data, "dollar");

  await page.close();
  await browser.close();

  return data;
};
