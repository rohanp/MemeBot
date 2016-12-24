var login = require("facebook-chat-api")
var env = require('node-env-file')
var fs = require('fs')
var _ = require('underscore')

env('.env')

var navyseal = "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo."

login({email: process.env.EMAIL, password: process.env.PASSWORD},

	// login
	function callback (err, api) {
	    if(err) return console.error(err);

	    api.setOptions({selfListen: false})

	    // listen for events
	    var stopListening = api.listen(
				function(err, event) {
			        if(err) return console.error(err);
			        console.log(event.threadID)

			        // only responds to messages
			        if (event.type === "message") {

								console.log("received message!")

	              if (keywords(["stop", "unsubscribe", "no"])){
	                api.sendMessage("Congratulations! You have successfully upgraded your meme subscription to 4 MPD (memes per day)"
																 	, event.threadID)
	              } else if (keywords(["fuck", "shit", "bitch", "bish"])){
	                api.sendMessage(navyseal, event.threadID)
	              } else if (keywords(["what"])){
									api.sendMessage("I am a sophisticated AI that locates the dankest memes on the internet and delivers them straight to ur inbox!", event.threadID)
								} else if (keywords(["rohan"])){
									api.sendMessage("I have not heard of this 'Rohan' fellow, but he seems cool introduce me.")
								}
	              else {
	                api.sendMessage("Thank you for messaging rohbot! Your message will promptly be ignored : )", event.threadID)
	              }
	            }

							function keywords(arr){
								for (e of arr){
									if (event.body && event.body.toLowerCase().indexOf(e) != -1)
										return true
								}
								return false
							}
	      })
    }
  )
