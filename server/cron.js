const fork = require("child_process").fork;
var cron = require("node-cron");

cron.schedule(
  "0 22 * * *",
  () => {
    console.log("Running first cron");
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
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "30 22 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "bogota",
      option: "apto",
      type: "venta",
      table: "bog_apt_ven",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "1 23 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "bogota",
      option: "casa",
      type: "arriendo",
      table: "bog_cas_arr",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "30 23 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "bogota",
      option: "casa",
      type: "venta",
      table: "bog_cas_ven",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "0 1 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "medellin",
      option: "apto",
      type: "arriendo",
      table: "med_apt_arr",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "30 1 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "medellin",
      option: "apto",
      type: "venta",
      table: "med_apt_ven",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "30 2 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "medellin",
      option: "casa",
      type: "arriendo",
      table: "med_cas_arr",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);

cron.schedule(
  "0 3 * * *",
  () => {
    console.log("Running second cron");
    const select = fork("selector.js");
    select.send({
      city: "medellin",
      option: "casa",
      type: "venta",
      table: "med_cas_ven",
    });
    select.on("message", (ans) => {
      console.log("Este es el retorno: ", ans);
    });
  },
  {
    scheduled: true,
    timezone: "America/Bogota",
  }
);
