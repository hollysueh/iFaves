const express = require('express')
const app = require('./app.js')

//Listen on port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
