const express = require("express");
const router = express.Router();
const app = express();
const fs = require("fs-extra");
const cors = require("cors");
const PORT = 3001;
const selectOptions = require("./selector");

app.use(cors());
app.use(express.json());

app.use(router);

router.post("/", async (req, res) => {
  const city = req.body.city;
  const option = req.body.option;
  const type = req.body.property;
  const quantity = req.body.quantity;
  console.time("selectOptions");
  const ans = await selectOptions(city, quantity, option, type);
  console.timeEnd("selectOptions");
  console.log(ans);
  res.sendStatus(200);
});

router.get("/download", async (req, res) => {
  let file = __dirname + "/out.csv";
  res.download(file, "out.csv");
  try {
    setTimeout(async () => {
      await fs.remove(file);
      console.log("File deleted");
    }, 2000);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
