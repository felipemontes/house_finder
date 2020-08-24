const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const fastcsv = require("fast-csv");
const { nanoid } = require("nanoid");
const db = require("./mysql");
const fs = require("fs");
const PORT = 3001;
require("./cron");

app.use(cors());
app.use(express.json());

app.use(router);

router.post("/", async (req, res) => {
  const city = req.body.city;
  const type = req.body.property;
  const option = req.body.option;
  const tb_name = city + "_" + type + "_" + option;
  res.status(200).send(tb_name);
});

router.get("/download/:tb", async (req, res) => {
  const table = req.params.tb;
  const jsonDb = await db.download(table);
  const name = nanoid(5) + ".csv";
  const ws = fs.createWriteStream(name);
  let path = __dirname + `/${name}`;

  fastcsv
    .write(jsonDb, { headers: true })
    .on("finish", () => {
      console.log("File created successfully");
    })
    .pipe(ws);
  setTimeout(() => {
    res.download(path);
  }, 2000);
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
