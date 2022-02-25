const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
