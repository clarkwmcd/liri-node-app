require("dotenv").config();
require("exports");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
var argOne = process.argv[2];

var spotify = new Spotify({
  id: "edaecfebcab944daa4ef6d843f13f049",
  secret: "90506e6f5911496a8cf3b7c65df58e24"
});

var client = new Twitter({
  consumer_key: "r1M17OpsycWhCLq5TxSNAJCUb",
  consumer_secret: "FItZT8heuKeIS5MNcQN5FzMpLwsrPte6mCXV9fFC75Nk6V8Wj0",
  access_token_key: "964621415453511685-4aP9whobJpYoH6NH286q7uN6Hu4pSNj",
  access_token_secret: "5VREuiNWmJYd724Ue3XQgGmxE0BpPALBanAGr79In24hv"
});

if (argOne === "my-tweets") {
  var params = {
    screen_name: 'clarkNode_js'
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("Here are the latest tweets from " + params.screen_name + ": ");
      var tweetsArray = [];
      for (i = 0; i < tweets.length; i++) {
        tweetsArray.push(tweets[i].text);
        console.log("     " + tweets[i].text);
      }
    }
  });
} else if (argOne === "spotify-this-song") {

  var song = process.argv[3];
  findsong();

} else if (argOne === "movie-this") {

  var movie = process.argv[3];

} else if (argOne === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if(error) {
      return console.log(error);
    }
    // var song = data;
    // findsong();
    console.log(data);
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
    console.log(response);
  }).catch(function(err) {
    console.log(err);
  });
};

// spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
// .then(function(data) {
//   console.log(data);
// }).catch(function(err) {
//   console.error('Error occurred: ' + err);
// });
