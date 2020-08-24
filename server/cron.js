const fork = require("child_process").fork;
var cron = require("node-cron");

cron.schedule("*/2 * * * *", () => {
  const select = fork("selector.js");
  select.send({
    city: "bogota",
    option: "apto",
    type: "arriendo",
    table: "bog_apt_arr",
  });
  select.on("message", (ans) => {
    console.log("Este es el retorno: ", ans);
  });
});
