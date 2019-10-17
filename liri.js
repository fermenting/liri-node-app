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
var term = "";
term = process.argv.slice(3).join("+");

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
  console.log(term)
  if (term === "") {
    term = "ween"
    console.log("Ween is coming to town!")
  };
  var axios = require("axios");
  axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
    .then(function (response) {

      // if (error) {
      //   console.log("That band isn't coming to this town!.\nAKA bands in town error.")
      // 
      var band = response.data[0];
      // console.log(band)
      //name of venue
      console.log("Venue: " + band.venue.name)
      //venue location
      console.log("Location: " + band.venue.city + ", " + band.venue.region)
      //date of event, using moment to get MM/DD/YYYY
      var moment = require('moment');
      var showDate = moment(band.datetime).format("MM/DD/YYYY")
      console.log("Date: " + showDate)

      console.log('                  __                                        __         ')
      console.log('                 |--|                                      |--|        ')
      console.log("      .._       o' o'                     (())))     _    o' o'        ")
      console.log("     //\\\    |  __                      )) _ _))  ,' ; |  __          ")
      console.log("    ((-.-\)  o' |--|  ,;::::;.          (C    )   / /^ o' |--|         ")
      console.log("   _))'='(\-.  o' o' ,:;;;;;::.         )\   -'( / /     o' o'         ")
      console.log("  (          \       :' o o `::       ,-)()  /_.')/                 .  ")
      console.log("  | .)(. |\ \      (  (_    )      /  (  `'  /\_)    .:izf:,_  .      |    ")
      console.log("  | | _   _| \ \     :| ,==. |:     /  ,   _  / 1  \ .:q568Glip-,  \  |  ")
      console.log("  \ \/ '-' (__\_\____::\`--'/::    /  /   / \/ /|\  \ -38'^'^`8k='  \ L, ")
      console.log("  \__\\[][]____(_\_|::,`--',::   /  /   /__/ <(  \  \ 8) o o 18-'_ (  /  ")
      console.log("   :\ o*.-.(     '-,':   _    :`.|  L----' _)/ ))-..__)(  J  498:- /]   ")
      console.log("   :   [   \     |     |=|   '  |\_____|,/.' //.    -38, 7~ P88;-'/ /   ")
      console.log("   :  | \   \    |  |  |_|   |  |    ||  :: (( :   :  ,`''`-._,' /     ")
      console.log("   :  |  \   \   ;  |   |    |  |    \ \_::_)) |  :  ,     ,_    /     ")
      console.log("   :( |   /  )) /  /|   |    |  |    |    [    |   \_\      _;--==--._ ")
      console.log("MJP:  |  /  /  /  / |   |    |  |    |    Y    |CJR (_\____:_        _:")
      console.log("   :  | /  / _/  /  \   |lf  |  |  CJ|mk  |    | ,--==--.  |_`--==--'_|")
      console.log("                                                         '   `--==--'  ")
      console.log()
    })
};

function movieThis() {

  var axios = require("axios");

  // if no movie input, default to "mr. nobody"
  if (term === "") {
    term = "mr.+nobody"
  };
  axios.get("http://www.omdbapi.com/?t="+term+"&y=&plot=short&apikey=trilogy")
  .then( function(response) {

  //     if (error) {
  //       console.log("I'm sorry Dave, I can't let you do that.\nAKA movie error.")
  //     }

  //     console.log(response)
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

    })
};


function spotifyThis() {

  //if no song is found, play default
  if (term === "") {
    term = "never+gonna+give+you+up"
  };

  spotify.search({ type: 'track', query: term }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);

    }
    spot = data.tracks.items[0]
    // console.log(spot);

    //Artist(s)
    for (var i in spot.artists) {
      console.log("Artist: " + spot.artists[i].name)
    }
    //song name
    console.log("Song Name: " + spot.name)

    //preview link of the song from spotify
    console.log("Preview Link: " + spot.preview_url)

    //album the song is on
    console.log("Album: " + spot.album.name)
  });


};

function doThis() {
  //using fs, grab text from 'random.txt'
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    term = data
  });
  //using a command, plug into a search.
  spotifyThis();
};

