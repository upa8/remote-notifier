var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var fs = require("fs");
import Expo from 'exponent-server-sdk';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/saveUser', function (req, res) {
   console.log( 'Token '+req.body.token);

   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data.users.push(req.body);
       console.log( data );
   });

   res.status(200).send({status: 'SUCCESS'});

   console.log('aFTER Notification')
    // To check if something is a push token
  let isPushToken = Expo.isExponentPushToken(req.body.token);

  // Create a new Expo SDK client
  let expo = new Expo();

  // To send push notifications -- note that there is a limit on the number of
  // notifications you can send at once, use expo.chunkPushNotifications()
    try {
    	console.log('Inside notifications' + req.body.token);
	    let receipts = await expo.sendPushNotificationsAsync([{
	        // The push token for the app user to whom you want to send the notification
	        to: req.body.token,
	        sound: 'default',
	        body: 'Welcome to our app',
	        data: {withSome: 'data'},
	      }]);
      console.log('SUCCESS '+receipts);
    } catch (error) {
      console.error('eRROR '+error);
    }
  
})

app.get('/test', function (req, res) {
  	res.send('Working')
})


var server = app.listen(5000, function () {

	console.log('App started');

})
