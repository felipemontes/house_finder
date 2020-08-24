const getProperties = require("./scraper");
process.on("message", async (msg) => {
  console.log(msg);
  const response = await selectOptions(
    msg.city,
    msg.type,
    msg.option,
    msg.table
  );
  process.send(response);
  process.exit();
});
async function selectOptions(city, option, type, table) {
  //server input
  let iterUrl = "";
  console.log(city);
  switch (city) {
    case "bogota":
      switch (type) {
        case "apto":
          switch (option) {
            case "arriendo":
              console.log("Entro a arriendo aptos en bogota");
              iterUrl =
                "https://www.fincaraiz.com.co/apartamentos/arriendo/bogota/?ad=30|REP||||2||8|||67|3630001||||||||||||||||1|||1||griddate%20desc||||-1||";
              break;
            case "venta":
              iterUrl =
                "https://www.fincaraiz.com.co/apartamentos/venta/bogota/?ad=30|REP||||1||8|||67|3630001|||||||||||||||||||1||griddate%20desc||||||";
              break;
            default:
              break;
          }
          break;
        case "casa":
          switch (option) {
            case "arriendo":
              iterUrl =
                "https://www.fincaraiz.com.co/casas/arriendo/bogota/?ad=30|REP||||2||9|||67|3630001|||||||||||||||||||1||griddate%20desc||||||";
              break;
            case "venta":
              iterUrl =
                "https://www.fincaraiz.com.co/casas/venta/bogota/?ad=30|REP||||1||9|||67|3630001|||||||||||||||||||1||griddate%20desc||||||";
              break;
            default:
              break;
          }
        default:
          break;
      }
      break;
    case "medellin":
      switch (type) {
        case "apto":
          switch (option) {
            case "arriendo":
              iterUrl =
                "https://www.fincaraiz.com.co/apartamentos/arriendo/medellin/?ad=30|REP||||2||8|||55|5500006||||||||||||||||1|||1||griddate%20desc||||||";
              break;
            case "venta":
              iterUrl =
                "https://www.fincaraiz.com.co/apartamentos/venta/medellin/?ad=30|REP||||1||8|||55|5500006|||||||||||||||||||1||griddate%20desc||||||";
              break;
            default:
              break;
          }
          break;
        case "casa":
          switch (option) {
            case "arriendo":
              iterUrl =
                "https://www.fincaraiz.com.co/casas/arriendo/medellin/?ad=30|REP||||2||9|||55|5500006|||||||||||||||||||1||griddate%20desc||||||";
              break;
            case "venta":
              iterUrl =
                "https://www.fincaraiz.com.co/casas/venta/medellin/?ad=30|REP||||1||9|||55|5500006|||||||||||||||||||1||griddate%20desc||||||";
              break;
            default:
              break;
          }
        default:
          break;
      }

    default:
      break;
  }

  await getProperties(iterUrl, table);
  return "Done";
}
