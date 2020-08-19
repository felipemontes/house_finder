const puppet = require("puppeteer");
const fs = require("fs-extra");

async function getProperties(iterUrl, TOTAL) {
  console.log("Welcome to the scrapper");
  console.log("TOTAL PAGES TO ITERATE: ", TOTAL);

  try {
    const exists = await fs.pathExists("out.csv");

    if (!exists) {
      await fs.writeFile(
        "out.csv",
        "Actualizado,URL,Ubicación,Precio,Admon,Area Priv.,Area Const.,Habitaciones,Baños,Parqueaderos\n"
      );
    }
    // iterate over number of pages
    for (let page_num = 1; page_num <= TOTAL; page_num++) {
      const browser = await puppet.launch({ headless: false });
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );

      newUrl = iterUrl.replace("REP", `${page_num}`);
      await page.goto(newUrl);
      console.log("ESTA ES LA URL QUE ESTA ITERANDO: ", newUrl);

      await page.waitForSelector("#divAdverts");
      const publications = await page.$$(".advert");

      // iterate over number of publications (publications.length)
      for (let i = 0; i < 5; i++) {
        await page.goto(newUrl);
        await page.waitForSelector("#divAdverts");
        const publications = await page.$$(".advert");

        const publication = publications[i];
        await publication.click();
        await page.waitForSelector(".boxcube");

        // publication time stamp
        const [dates] = await page.$x("//ul[contains(., 'Actualizado:')]");
        const date = await dates.$eval("span", (span) => span.innerHTML);

        //url
        const publi_url = page.url();

        //ubication
        const titles = await page.$$(".title .box  span");
        let firstSpan;
        let ubication;
        if (titles.length === 2) {
          firstSpan = titles[0];
          ubication = await page.evaluate(
            (firstSpan) => firstSpan.innerHTML,
            firstSpan
          );
        } else {
          secondSpan = titles[1];
          ubication = await page.evaluate(
            (secondSpan) => secondSpan.innerHTML,
            secondSpan
          );
        }

        //price
        let price;
        const priceTag = await page.$$(".price h2 > label");
        if (priceTag.length === 2) {
          firstPrice = priceTag[0];
          secondPrice = priceTag[1];
          price1 = await page.evaluate(
            (firstPrice) => firstPrice.innerHTML,
            firstPrice
          );
          price2 = await page.evaluate(
            (secondPrice) => secondPrice.innerHTML,
            secondPrice
          );
          price = `Desde ${price1} Hasta ${price2}`;
        } else {
          const priceTitle = await page.$(".price");
          price = await priceTitle.$eval("h2", (h2) => h2.innerHTML);
        }

        //details
        const details = await page.$$(".boxcube > li");

        //private Area
        const pArea = details[0];
        const areatext = await pArea.getProperty("textContent");
        const json = await areatext.jsonValue();
        const area2 = await json.toString();
        let privArea = area2.match(/\d+,\d+ m./g);
        privArea = privArea.join("");

        //admon
        const admon = await page.$x("//li[contains(., 'Admón:')]");
        let admin;
        if (admon.length > 0) {
          const admText = await admon[0].getProperty("textContent");
          const rawAdm = await admText.jsonValue();
          const adm = rawAdm.toString();
          admin = adm.match(/\$\d+,\d+/);
          if (admin) {
            admin = admin.join("");
          } else {
            admin = "N/A";
          }
        } else {
          admin = "N/A";
        }

        // area
        const [el] = await page.$x(
          '//*[@id="ctl00_phMasterPage_cAdvert_Details_1"]/div/span[1]'
        );
        const text = await el.getProperty("textContent");
        const rawTxt = await text.jsonValue();
        const area = rawTxt.toString().trim();

        // bedrooms
        const [beds] = await page.$x(
          '//*[@id="ctl00_phMasterPage_cAdvert_Details_1"]/div/span[2]'
        );
        const bedsText = await beds.getProperty("textContent");
        const rawBeds = await bedsText.jsonValue();
        const formatBeds = rawBeds.toString().trim();
        let numBed = formatBeds.match(/\d/g);
        bedrooms = numBed.join("");

        // bathrooms
        const [baths] = await page.$x(
          '//*[@id="ctl00_phMasterPage_cAdvert_Details_1"]/div/span[3]'
        );
        const bathsText = await baths.getProperty("textContent");
        const rawBaths = await bathsText.jsonValue();
        const formatBath = rawBaths.toString().trim();
        let numbBaths = formatBath.match(/\d/g);
        bathrooms = numbBaths.join("");

        // parking
        const [parking] = await page.$x(
          '//*[@id="ctl00_phMasterPage_cAdvert_Details_1"]/div/span[4]'
        );
        let numbParkings;
        const parkingText = await parking.getProperty("textContent");
        const rawParking = await parkingText.jsonValue();
        let formatPark = rawParking.toString().trim();
        if (formatPark == "Sin especificar") {
          parkings = "Sin especificar";
        } else {
          numbParkings = formatPark.match(/\d/g);
          parkings = numbParkings.join("");
        }

        console.log(`--- PAGE NUMBER : ${page_num} ---`);
        console.log("Actualizado:", date);
        console.log(publi_url);
        console.log("Ubicacion: ", ubication);
        console.log("Precio: ", price);
        console.log("Admon: ", admin);
        console.log("Area Privada: ", privArea);
        console.log("Area Construida: ", area);
        console.log("Habitaciones: ", bedrooms);
        console.log("Baños: ", bathrooms);
        console.log("Parqueaderos: ", parkings);

        await fs.appendFile(
          "out.csv",
          `"${date}","${publi_url}","${ubication}","${price}","${admin}","${privArea}","${area}","${bedrooms}","${bathrooms}","${parkings}"\n`
        );
      }
      await browser.close();
    }
    return 200;
  } catch (error) {
    console.error("My error: ", error);
  }
}

module.exports = getProperties;
