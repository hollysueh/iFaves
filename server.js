const express = require('express')
const path = require('path');
const app = require('./app.js')

//For Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("iFaves_frontend/build"));
  app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "iFaves_frontend", "build", "index.html")); });
  }

//Listen on port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
