var login = require("facebook-chat-api")
var env = require('node-env-file')
var fs = require('fs')
var _ = require('underscore')

env('.env')

var usersFile = fs.readFileSync("./users.txt", "utf-8");
var users = usersFile.split("\n")

var quotesFile = fs.readFileSync("./quippyQuotes.txt", "utf-8");
var quotes = quotesFile.split("\n")

var memes = fs.readdirSync('./memes')
var memeOfTheDay = fs.createReadStream("memes/" + _.sample(memes))

login({email: process.env.EMAIL, password: process.env.PASSWORD},

  function callback(err, api){
    if(err) return console.log(err);

    api.getFriendsList(
      function(err, subscribers){

        subscribers.forEach(
          function (person){

              api.sendMessage(_.sample(quotes), person.userID)
              var meme = {attachment: memeOfTheDay}
              api.sendMessage(meme, person.userID)

              if (_.indexOf( person.userID , users) == -1){
                welcomeUser(person)
              }

          }
        )

      }
    )

    function welcomeUser(person){

      api.sendMessage("Congratulations! You have successfully subscribed to a lifetime membership for fresh, organic, hand-picked memes delivered right to your inbox! Just say 'stop' to stop the messages!")
      users.push(person.userID)
      fs.appendFile('users.txt', '\n' + person.userID, function(){});

    }

  }
)
