const puppet = require("puppeteer");
const fs = require("fs-extra");

async function getProperties(URL, TOTAL) {
  console.log("Welcome to the scrapper");
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
      const browser = await puppet.launch({ headless: true });
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );
      await page.goto(URL);
      await page.waitForSelector("#divAdverts");
      const publications = await page.$$(".advert");

      // iterate over number of publications publications.length
      for (let i = 0; i < publications.length; i++) {
        let iterUrl = ``;
        if (
          URL ===
          "https://www.fincaraiz.com.co/apartamentos/arriendo/medellin/?ad=30|1||||2||8|||55|5500006||||||||||||||||1|||1||griddate%20desc||||||"
        ) {
          iterUrl = `https://www.fincaraiz.com.co/apartamentos/arriendo/medellin/?ad=30|${page_num}||||2||8|||55|5500006||||||||||||||||1|||1||griddate%20desc||||||`;
        }

        await page.goto(iterUrl);
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
        const title = await page.$(".title");
        const ubication = await title.$eval("span", (span) => span.innerHTML);

        //price
        const priceTag = await page.$(".price");
        const price = await priceTag.$eval("h2", (h2) => h2.innerHTML);

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
          '//*[@id="ctl00_phMasterPage_cAdvert_Details_1"]/div/span[3]'
        );
        const parkingText = await parking.getProperty("textContent");
        const rawParking = await parkingText.jsonValue();
        const formatPark = rawParking.toString().trim();
        let numbParkings = formatPark.match(/\d/g);
        parkings = numbParkings.join("");

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
    return "Process completed";
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function selectOptions(city, quantity) {
  //server input
  let URL = "";
  let TOTAL = quantity;

  console.log(city);
  switch (city) {
    case "bogota":
      URL =
        "https://www.fincaraiz.com.co/apartamentos/arriendo/bogota/?ad=30|1||||2||8|||67|3630001||||||||||||||||1|||1||griddate%20desc||||-1||";
      break;
    case "medellin":
      console.log("Entro a medellin");
      URL =
        "https://www.fincaraiz.com.co/apartamentos/arriendo/medellin/?ad=30|1||||2||8|||55|5500006||||||||||||||||1|||1||griddate%20desc||||||";
    default:
      break;
  }

  return await getProperties(URL, TOTAL);
}

module.exports = selectOptions;
