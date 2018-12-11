// Language Interpretation & Recognition Interface

require("dotenv").config();

var fs = require("fs")

var Spotify = require('node-spotify-api');

//spotify config
var keys = require("./keys.js");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
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
  
  if (term === undefined) {
    term = "lil+dicky"
  };
  
  axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
    .then(function (error, response) {

      if (error) {
        console.log("That band isn't coming to this town!.\nAKA bands in town error.")
      }

      //axios request
      //name of venue
      //venue location
      //date of event, using moment to get MM/DD/YYYY
    })
};

function movieThis() {

  // if no movie input, default to "mr. nobody"
  if (term === undefined) {
    term = "mr.+nobody"
  };
  axios.get("http://www.omdbapi.com/?t=" + term + "&apikey=trilogy")
    .then(function (error, response) {

      if (error) {
        console.log("I'm sorry Dave, I can't let you do that.\nAKA movie error.")
      }

      var omdb = response.data

      //  * Title of the movie.
      console.log("Title: " + omdb.Title)

      // * Year the movie came out.
      console.log("Year: " + omdb.Year)

      // * IMDB Rating of the movie.
      console.log("Rating: " + omdb.imdbRating);

      // * Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes: " + omdb.Ratings[1].Source)

      // * Country where the movie was produced.
      console.log("Country: " + omdb.Country)

      // * Language of the movie.
      console.log("Language: " + omdb.Language)

      // * Plot of the movie.
      console.log("Plot: " + omdb.Plot)

      // * Actors in the movie.
      console.log("Actors: " + omdb.Actors)

    });
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
    for (var i in data.artists) {
      console.log("Artist: " + data.artists[i].name)
    }
    //song name
    console.log("Song Name: " + data.name)

    //preview link of the song from spotify
    console.log("Preview Link: " + data.preview_url)

    //album the song is on
    console.log("Album: " + data.album.name)
  });


};

function doThis() {
  //using fs, grab text from 'random.txt'
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error){
      return console.log(error);
    }
    term = data
  });
  //using a command, plug into a search.
  spotifyThis();
};

