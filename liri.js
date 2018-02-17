require("dotenv").config();
var Twitter = require("twitter");
var params = {screen_name: 'clarkNode_js'};
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var argOne = process.argv[2];
var argTwo = process.argv[3];

if(argOne === "my-tweets") {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
}
else if(argOne === "spotify-this-song") {

}
else if(argOne === "movie-this") {

}

else if(argOne === "do-what-it-says") {

}

else {
  console.log("error");
}
