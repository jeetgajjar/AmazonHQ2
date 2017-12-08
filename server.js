var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
// var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var oracledb = require('oracledb');
var dbConfig = require('./config/database.js');

// mongoose.connect(configDB.url);
oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
    function(err, connection)
    {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('Connection was successful!');

      connection.execute(
        "SELECT * "
      + "FROM countries ",
        [180],
        { maxRows: 10 },  // a maximum of 10 rows will be returned.  Default limit is 100
        function(err, result)
        {
          if (err) { console.error(err.message); return; }
          console.log(result.rows);  // print all returned rows
        });
      connection.close(
        function(err)
        {
          if (err) {
            console.error(err.message);
            return;
          }
        });
    });


// require('./config/passport')(passport) //pass passport for configuration


app.use(morgan('dev')); //log every request to console
app.use(cookieParser()); //reads cookies (for auth)
app.use(bodyParser()); //gets info from html forms

app.set('view engine', 'ejs'); //set up ejs for templating

app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); //session secret
app.use(passport.initialize());
app.use(flash());

//routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.listen(port);
console.log('Listening on port: ' + port);

// app.get('/', function (req, res) {
//    console.log("Got a GET request for the homepage");
//    res.send('Hello GET');
// })
//
//
// Create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//
// app.use(express.static('public'));
// app.get('/index.htm', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.htm" );
// })
//
// app.post('/process_post', urlencodedParser, function (req, res) {
//    // Prepare output in JSON format
//    console.log(req.body);
//    response = {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })
//
// // This responds a POST request for the homepage
// app.post('/', function (req, res) {
//    console.log("Got a POST request for the homepage");
//    res.send('Hello POST');
// })
//
// // This responds a DELETE request for the /del_user page.
// app.delete('/del_user', function (req, res) {
//    console.log("Got a DELETE request for /del_user");
//    res.send('Hello DELETE');
// })
//
// // This responds a GET request for the /list_user page.
// app.get('/list_user', function (req, res) {
//    console.log("Got a GET request for /list_user");
//    res.send('Page Listing');
// })
//
// // This responds a GET request for abcd, abxcd, ab123cd, and so on
// app.get('/ab*cd', function(req, res) {
//    console.log("Got a GET request for /ab*cd");
//    res.send('Page Pattern Match');
// })
//
// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log("Example app listening at http://%s:%s", host, port)
// })
