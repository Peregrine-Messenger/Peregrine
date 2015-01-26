var osascript = require('node-osascript');
 	osascript.execute('tell application "Messages" to send message to buddy "James Anderson"',{message: "lelelelel"},function(error, result, raw){
  if (err) return console.error(err)
    console.log(result, raw)
});