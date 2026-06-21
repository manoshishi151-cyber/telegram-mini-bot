const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🔥 MicroWork Bot Running Successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
