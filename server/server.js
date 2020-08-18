const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(router);

router.post("/", (req, res) => {
  res.send("Hola server").status(200);
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
