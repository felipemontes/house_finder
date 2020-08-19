const express = require("express");
const router = express.Router();
const app = express();
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
  const ans = await selectOptions(city, quantity, option, type);
  console.log(ans);
  res.sendStatus(ans);
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
