const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const fastcsv = require("fast-csv");
const manager = require("./selector");
const db = require("./mysql");
const fs = require("fs");
const PORT = 3001;

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
  const ws = fs.createWriteStream("bog_apt_arr.csv");
  let path = __dirname + `/${table}.csv`;

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
