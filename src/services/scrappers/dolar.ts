import { chromium } from "playwright";

export const scrapDollarValuesInArg = async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu"],
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

  await browser.close();

  return data;
};

const main = async () => {
  const data = await scrapDollarValuesInArg();
  console.log(data);

  const saveInJson = (data: any, name: string) => {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, name + ".json");
    fs.writeFileSync(filePath, JSON.stringify(data));
  };

  saveInJson(data, "values");
};
