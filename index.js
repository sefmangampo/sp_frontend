const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// start express server on port 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
