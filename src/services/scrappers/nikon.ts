import { chromium } from "playwright";

const scrapProductsFromNikon = async (url: string) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const products = await page.evaluate(() => {
    const elements = document.querySelectorAll(".detalles");

    const deleteLineBreak = (text: string) => text.replace(/\r?\n|\r/g, "");
    const deleteSpaces = (text: string) => text.replace(/\s+/g, " ");

    const products = Array.from(elements).map((element) => {
      return {
        name: element.querySelector(".titulo")?.textContent,
        price: deleteSpaces(
          deleteLineBreak(
            element.querySelector(".info-precio")?.textContent!
          ).trim()
        ),
      };
    });

    return products;
  });

  return products;
};

const main = async () => {
  const products = await scrapProductsFromNikon(
    "https://www.nikon.com.ar/productos/objetivos_categoria.php?cat=0"
  );

  const saveInJson = (data: any, name: string) => {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, name + ".json");
    fs.writeFileSync(filePath, JSON.stringify(data));
  };

  saveInJson(products, "products");
};

main();
