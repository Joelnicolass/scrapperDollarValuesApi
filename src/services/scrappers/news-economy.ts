import { chromium } from "playwright";
import { saveInJson } from "../../utils/files.utils";

export const scrapNewsEconomy = async () => {
  // INFOBAE
  console.log(
    "Iniciando scrapping de titulares de noticias en economia de infobae: " +
      new Date().toLocaleString()
  );

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--disable-gpu-sandbox", "--single-process"],
  });

  const page = await browser.newPage();

  await page.goto("https://www.infobae.com/economia/", {
    timeout: 0,
  });

  const infobae = await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);

    const elements = document.querySelectorAll("h2");

    const titles = Array.from(elements).map((element) => {
      return {
        title: element.textContent,
      };
    });

    return titles;
  });

  //------------------------------------------------

  // LA NACION
  console.log(
    "Iniciando scrapping de titulares de noticias en economia de la nacion: " +
      new Date().toLocaleString()
  );

  await page.goto("https://www.lanacion.com.ar/economia/", {
    timeout: 0,
  });

  const lanacion = await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);

    const elements = document.querySelectorAll("h2");

    const titles = Array.from(elements).map((element) => {
      return {
        title: element.textContent,
      };
    });

    return titles;
  });

  await page.close();
  await browser.close();

  const newsEconomy = {
    infobae,
    lanacion,
  };

  saveInJson(newsEconomy, "news-economy");

  return newsEconomy;
};

export const test = async () => {
  const data = await scrapNewsEconomy();
  console.log(data);
};
