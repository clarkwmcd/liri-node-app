require("dotenv").config();
require("exports");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var argOne = process.argv[2];

if (argOne === "my-tweets") {
  var argTwo = process.argv[3]
  var params = {
    screen_name: argTwo
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("Here are the latest tweets from " + params.screen_name + ": ");
      console.log(" ");
      var tweetsArray = [];
      for (i = 0; i < tweets.length; i++) {
        tweetsArray.push(tweets[i].text);
        console.log(tweets[i].text);
      }
    }
  });
} else if (argOne === "spotify-this-song") {

  var song = process.argv[3];
  findsong();

} else if (argOne === "movie-this") {

  var movie = process.argv[3];
  request("http://www.omdbapi.com/?t="+ movie +"&plot=short&apikey=trilogy", function(error, response, body) {

      // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      var parseObject = JSON.parse(body);
      console.log("Title: " + parseObject.Title);
      console.log("Year: " + parseObject.Year);
      console.log("imdb Rating: " + parseObject.imdbRating);
      console.log("Rotten Tomatoes Score: " + parseObject.Ratings[1].Value);
      console.log("Country: " + parseObject.Country);
      console.log("Language(s): " + parseObject.Language);
      console.log("Plot: " + parseObject.Plot);
      console.log("Actors: " + parseObject.Actors);
    }
  });

} else if (argOne === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if(data.slice(0,17) == "spotify-this-song"){
      song = data.slice(19,data.length);
      console.log(song)
      if(error) {
        return console.log(error);
      }
      findsong();
    }
    else if (data.slice(0,10) == "movie-this") {
      var movie = data.slice(11, data.length)
      request("http://www.omdbapi.com/?t="+ movie +"&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
          var parseObject = JSON.parse(body);
          console.log("Title: " + parseObject.Title);
          console.log("Year: " + parseObject.Year);
          console.log("imdb Rating: " + parseObject.imdbRating);
          console.log("Rotten Tomatoes Score: " + parseObject.Ratings[1].Value);
          console.log("Country: " + parseObject.Country);
          console.log("Language(s): " + parseObject.Language);
          console.log("Plot: " + parseObject.Plot);
          console.log("Actors: " + parseObject.Actors);
        }
      });
    }
    else {
      console.log("Error please enter valid input")
    }
  });
} else {
  console.log("error");
}

function findsong() {
  spotify.search({
    type: 'track',
    query: song,
    limit: 1
  }).then(function(response) {
    var songInfo = response.tracks.items[0];
    console.log("Artists: " + songInfo.artists[0].name);
    console.log("Song Name: " + songInfo.name);
    console.log("Preview Link: " + songInfo.preview_url);
    console.log("Album: " + songInfo.album.name);

    // console.log(response.tracks.items);
  }).catch(function(err) {
    console.log(err);
  });
};
