// Language Interpretation & Recognition Interface

//Search Avenues
//Spotify for songs
//Bands in Town for concerts
//OMDB for Movies KEY 187ccf02

require("dotenv").config();

//Add code required to import 'keys.js' and store in variable
//var spotify = new Spotify(keys.spotify);

//commands
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says

//get the key data:
var fs = require("fs")

fs.readFile("keys.js", "utf8", function (error) {
  if (error) {
    return console.log("keys.js error")
  }
  var spotify = new Spotify(keys.spotify);
});

var command = process.argv[2].toLowerCase();

switch(command) {
  case "concert-this":
    concertThis()
    break;
    case "spotify-this-song":
    concertThis()
    break;
    case "movie-this":
    concertThis()
    break;
    case "do-what-it-says":
    concertThis()
    break;
    default: 
    console.log("Command not recognized. LIRI can understand the following commands: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says\n \n Please try again.")
    break:
}
