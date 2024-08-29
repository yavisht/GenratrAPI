const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const genratr = require("./lib/genratr"); // Import the password generator module

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const password = genratr(req.query);
  if (Object.keys(req.query).length === 0) {
    return res.sendFile(path.join(__dirname, "index.html"));
  }
  if (!password) {
    return res.status(400).json({ error: "Invalid request" });
  }
  res.json({ password });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// To export the app for testing
// module.exports = app;
