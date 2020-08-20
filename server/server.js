const express = require("express");
const router = express.Router();
const app = express();
const fs = require("fs-extra");
const cors = require("cors");
const fork = require("child_process").fork;
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(router);

router.post("/", async (req, res) => {
  const city = req.body.city;
  const option = req.body.option;
  const type = req.body.property;
  const quantity = req.body.quantity;
  const select = fork("selector.js");
  select.send({
    city,
    option,
    type,
    quantity,
  });
  select.on("message", (ans) => {
    res.status(200).send(ans);
  });
});

router.get("/download/:id", async (req, res) => {
  const dId = req.params.id;
  let file = __dirname + `/${dId}`;
  res.download(file);
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
