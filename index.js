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
   console.log(req.body);

   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data.users.push(req.body);
       console.log( data );
   });
   res.status(200).send({status: 'SUCCESS'});
})


app.get('/listUsers', function (req, res) {
  //  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
  //      console.log( data );
  //      res.end( data );
  //  });

  // To check if something is a push token
  let isPushToken = Expo.isExponentPushToken('ExponentPushToken[1CasSGA3kQGHdsRnkA6Wta]');

  // Create a new Expo SDK client
  let expo = new Expo();

  // To send push notifications -- note that there is a limit on the number of
  // notifications you can send at once, use expo.chunkPushNotifications()

    try {
      let receipts = expo.sendPushNotificationsAsync([{
        // The push token for the app user to whom you want to send the notification
        to: 'ExponentPushToken[1CasSGA3kQGHdsRnkA6Wta]',
        sound: 'default',
        body: 'My first remote notification',
        data: {withSome: 'Office hours completed!'},
      }]);
      console.log(receipts);
      res.end('Notification sent !');
    } catch (error) {
      console.error(error);
    }

})

app.get('/:id', function (req, res) {
  // To check if something is a push token
  let isPushToken = Expo.isExponentPushToken(somePushToken);

  // Create a new Expo SDK client
  let expo = new Expo();

  // To send push notifications -- note that there is a limit on the number of
  // notifications you can send at once, use expo.chunkPushNotifications()
  (async function() {
    try {
      let receipts = await expo.sendPushNotificationsAsync([{
        // The push token for the app user to whom you want to send the notification
        to: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
        sound: 'default',
        body: 'This is a test notification',
        data: {withSome: 'data'},
      }]);
      console.log(receipts);
    } catch (error) {
      console.error(error);
    }
  })();
})

var server = app.listen(80, function () {

  var host = '192.168.56.1';
  var port = server.address().port;
  
  console.log("Services available on- http://192.168.56.1:80/");

})
