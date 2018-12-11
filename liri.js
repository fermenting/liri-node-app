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

var Spotify = require('node-spotify-api');

//SPOTIFY EXMAPLE from NPM
// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });

fs.readFile("keys.js", "utf8", function (error) {
  if (error) {
    return console.log("keys.js error")
  }
  var spotify = new Spotify(keys.spotify);
});

var command = process.argv[2].toLowerCase();
var term = process.argv.slice(3).join("+");

switch (command) {
  case "concert-this":
    concertThis()
    break;
  case "spotify-this-song":
    spotifyThis()
    break;
  case "movie-this":
    movieThis()
    break;
  case "do-what-it-says":
    doThis()
    break;
  default:
    console.log("Command not recognized. LIRI can understand the following commands: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says\n \nPlease try again.")
    break
}

function concertThis() {
  var bandsURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
  //axios request
  //name of venue
  //venue location
  //date of event, using moment to get MM/DD/YYYY

};

function movieThis() {
  axios.get("http://www.omdbapi.com/?t=" + term + "&apikey=trilogy").then(
    function (error, response) {
      if (error){
         // if no movie input, default to "mr. nobody"
      }

      var omdb = response.data

      //  * Title of the movie.
      console.log(omdb.Title)

      // * Year the movie came out.
      console.log(omdb.Year)
      
      // * IMDB Rating of the movie.
      console.log("The movie's rating is: " + omdb.imdbRating);

      // * Rotten Tomatoes Rating of the movie.
      console.log(omdb.Ratings[1].Source)

      // * Country where the movie was produced.
      console.log(omdb.Country)

      // * Language of the movie.
      console.log(omdb.Language)

      // * Plot of the movie.
      console.log(omdb.Plot)

      // * Actors in the movie.
      console.log(omdb.Actors)

    }
  );



 
};

function spotifyThis() {


  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });

  spotify.search({ type: 'track', query: term }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
      //if no song is found, play default
      //rick roll

    }
    console.log(data);
    //Artist(s)
    console.log(data.artist)
    //song name
    console.log(data.name)
    //preview link of the song from spotify
    console.log(data.previewLink)
    //album the song is on
    console.log(data.album)
  });


};

function doThis() {
  //using fs, grab text from 'random.txt'
  fs.readFile("random.txt", "utf8", function (error, data) {
    term = data
  });
  //using a command, plug into a search.
  spotifyThis();
};

