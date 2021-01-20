const express = require('express')
const path = require('path');
const app = require('./app.js')

//For Heroku deployment

//static file
app.use(express.static(path.join(__dirname, "iFaves_frontend/build")));

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "iFaves_frontend/build"));
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "iFaves_frontend", "build", "index.html")); });
}

//build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/iFaves_frontend/public/index.html'));})


//Listen on port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
