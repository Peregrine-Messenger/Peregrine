// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
//var configDB = require('./config/database.js');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://hackgeny:password@novus.modulusmongo.net:27017/xizoV8ig'); // connect to our database

var server = require('http').createServer(app);

server.listen(port, function(){
	console.log('listening '+ port);
})
server.listen(port);

// Twilio Credentials
var accountSid = 'ACa4fb98b020de53c9f931650cb946bede';
var authToken = '3e98ce0d8213eb477c013a12a449b9e6';

//require the Twilio module and create a REST client

function sendMessages(message,destination){
 	var osascript = require('node-osascript');
 	osascript.execute('tell application "Messages" to send info to buddy "James Anderson"',{info: message},function(error, result, raw){
  if (err) return console.error(err)
    console.log(result, raw)
});
 	return 0;
 }
function sendText(message,destination){
	var client = require('twilio')(accountSid, authToken);
  	client.sendMessage({

  	    to: destination, // Any number Twilio can deliver to
  	    from: '+13234571289', // A number you bought from Twilio and can use for outbound communication
 	    body: message // body of the SMS message

 	}, function(err, responseData) { //this function is executed when a response is received from Twilio

 	    if (!err) { // "err" is an error received during the request, if an

 	        console.log(responseData.from); // outputs "+14506667788"
 	        console.log(responseData.body); // outputs "word to your mother."

 	    }else{
 	    console.log("err");
 	    console.log(err);
 		}
 	});
 	return 0;
 }

// create our router
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

//router.get('/iMessageToSMS' function(req, res){

//});

router.get('/twilio', function(req, res){
	//console.log('abc');
	var body = req.query.Body;
	var from = req.query.From;
	//exports.bridgeFunction =function (string){body=string;} //allows bridge.js to change body

	module.exports={
			bridgeFunction: function(string){body=string;}
	}
	var unsplit = body.split(":", 2);
	var destination = unsplit[0];
	var message = unsplit[1];

	//console.log(body);
	console.log(destination);
	console.log(message);
	var myBoolean = false;
	for(var i = 0; i<destination.length; i++){
		if(destination.substring(i,i+1) == " " || destination.substring(i,i+1) == "@"){
			myBoolean = true;
		}
	}

	message = message + "From: " + from;
	if(myBoolean)
	{
		sendMessages(message,destination);
		console.log("method called");}
	else
	{
		sendText(message,destination);}


});


// var applescript = require("applescript");

// // Very basic AppleScript command. Returns the song name of each
// // currently selected track in iTunes as an 'Array' of 'String's.
// var script = 'tell application "iTunes" to get name of selection';

// applescript.execString(script, function(err, rtn) {
//   if (err) {
//     // Something went wrong!
//   }
//   if (Array.isArray(rtn)) {
//     rtn.forEach(function(songName) {
//       console.log(songName);
//     });
//   }
// });

app.use('/', router);

