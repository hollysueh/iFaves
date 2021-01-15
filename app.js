const express = require('express')
const request = require('request')
const fs = require('fs');
const helmet = require('helmet')
const app = express()

//Body Parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//HELMET - Security Middleware
app.use(helmet());


//GET - Display list of favourite media
app.get('/favesList', function(req, res) {
  fs.readFile('./config/myFaves.json',  'utf-8', (err, data) => { //read file contents of 'myFaves.json'
    if (err) res.json({"message": 'You haven`t favourited anything!'}); //Display error message if user tries to 'get' without 'post'ing first
    else
      res.json({"message": `${data}`}); //Display list of favourited media 
  })
})

//POST - Search iTunes Store API for media
app.post('/search', function(req, res) {
  request({ //Get search terms from body
    uri: `https://itunes.apple.com/search?term=${req.body.searchTerm}&media=${req.body.media}`,
  }).pipe(res); //return data to front-end
});

//POST - Add a media object to favourites
app.post('/addFave', (req, res) => {
  let favourites = JSON.parse(fs.readFileSync('./config/myFaves.json')); //read existing list of favourite media
  let newFave = JSON.parse(`{
    "artistName":"${req.body.artistName}",
    "mediaKind":"${req.body.mediaKind}",
    "trackName":"${req.body.trackName}",
    "trackPrice":${req.body.trackPrice},
    "releaseDate":"${req.body.releaseDate}",
    "genre":"${req.body.genre}",
    "contentAdvisory":"${req.body.contentAdvisory}"
  }`); //get details of new 'favourite' object from body

  favourites.push(newFave); //add 'newFave' object into existing JSON array

  fs.writeFile('./config/myFaves.json', JSON.stringify(favourites), (err) => { //write file with updated 'favourites'
    res.status(201).json(
      (favourites, 'Favourite added to list!') //return message if file updated successfully
    );
    if (err) throw err;
  });
})

//DELETE - delete selected favourite media from list
app.delete("/favesList", (req, res) => {
  let trackToDel = req.body.trackName; //get trackName of the 'favourite' object user wants to delete
  let favourites = JSON.parse(fs.readFileSync('./config/myFaves.json')); //read current list of favourites
 
  const findTrack = favourites.find(f => f.trackName == trackToDel); //find if favourite with corresponding trackName exists
  const foundTrack = favourites.filter(f => f.trackName != trackToDel); //filter objects to only elements WITHOUT matching trackName

  if (findTrack == undefined) { //if no favourite exists with corresponding trackName...
    res.json(`Oops! Something went wrong.`); //return message if object does not exist
  }
  else { //if favourite exists with corresponding trackName...
    favourites = foundTrack; //update list of 'favourites'
    
    fs.writeFile('./config/myFaves.json', JSON.stringify(favourites), (err) => { //write file with updated 'favourites' list
      res.status(201).json(
        favourites, 'Successfully deleted!' //return message if object deleted successfully
      );
      if (err) throw err;
    });
  }
})

// For app deployment on Heroku
/* if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'iFaves_frontend/build')));
  app.get('*',(req,res)=> {
    res.sendFile(path.resolve(__dirname, 'iFaves_frontend', 'build','index.html'));
  });
} */

module.exports = app

/*
REFERENCES:
Using request for external API:  https://stackoverflow.com/questions/49215963/express-js-render-data-from-external-api
*/
