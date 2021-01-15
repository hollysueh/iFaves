const express = require('express')
<<<<<<< HEAD
const path = require('path');
const app = require('./app.js')

//For Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("ifaves_frontend/build"));
  app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "ifaves_frontend", "build", "index.html")); });
  }

=======
const app = require('./app.js')

>>>>>>> 6685861161c7e788d4f24989cbe4d4f68df92d0a
//Listen on port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
