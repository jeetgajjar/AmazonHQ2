


// // app/routes.js
// module.exports = function(app, passport) {
    
//         // =====================================
//         // HOME PAGE (with login links) ========
//         // =====================================
//         app.get('/', function(req, res) {
//             res.render('index.ejs'); // load the index.ejs file
//         });
    
//         // =====================================
//         // LOGIN ===============================
//         // =====================================
//         // show the login form
//         app.get('/login', function(req, res) {
    
//             // render the page and pass in any flash data if it exists
//             res.render('login.ejs', { message: req.flash('loginMessage') }); 
//         });
    
//         // process the login form
//         // app.post('/login', do all our passport stuff here);
    
//         // =====================================
//         // SIGNUP ==============================
//         // =====================================
//         // show the signup form
//         app.get('/signup', function(req, res) {
    
//             // render the page and pass in any flash data if it exists
//             res.render('signup.ejs', { message: req.flash('signupMessage') });
//         });
    
//         // process the signup form
//         // app.post('/signup', do all our passport stuff here);
    
//         // =====================================
//         // PROFILE SECTION =====================
//         // =====================================
//         // we will want this protected so you have to be logged in to visit
//         // we will use route middleware to verify this (the isLoggedIn function)
//         app.get('/profile', isLoggedIn, function(req, res) {
//             res.render('profile.ejs', {
//                 user : req.user // get the user out of session and pass to template
//             });
//         });
    
//         // =====================================
//         // LOGOUT ==============================
//         // =====================================
//         app.get('/logout', function(req, res) {
//             req.logout();
//             res.redirect('/');
//         });
//          // process the login form
//     app.post('/login', passport.authenticate('local-login', {
//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/login', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));

//     var obj = {};
//     app.post('/testServer', function(req,res) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.render('testServer.ejs'), {
//             test : req.test
//         }
//     });
//     // app.get('/testServer', function (req, res) {
//     //     res.writeHead(200, {'Content-Type': 'text/html'});
//     //     res.write();
//     //     res.end();
//     //     });

//     // app.get('testServer', function (req, res) {
//     //     res.render('testServer.ejs');
//     // });
//     };
    
//     // route middleware to make sure a user is logged in
//     function isLoggedIn(req, res, next) {
    
//         // if user is authenticated in the session, carry on 
//         if (req.isAuthenticated())
//             return next();
    
//         // if they aren't redirect them to the home page
//         res.redirect('/');
//     }
    
function getRouter() {
    var router = express.Router();
 
    router.route('/signup')
        .post(insertAirport);
 
    // router.route('/depts')
    //     .get(getDepts);
 
    return router;
}
 
module.exports.getRouter = getRouter;

var serverFile = require('/Users/jg/Desktop/AmazonHQ2/server.js');
var dbConfig = require('/Users/jg/Desktop/AmazonHQ2/config/database.js');
var http = require('http');


// app/routes.js
module.exports = function(app, passport) {
    
        // =====================================
        // HOME PAGE (with login links) ========
        // =====================================
        app.get('/', function(req, res) {
            res.render('index.ejs'); // load the index.ejs file
        });
    
        // =====================================
        // LOGIN ===============================
        // =====================================
        // show the login form
        app.get('/login', function(req, res) {
    
            // render the page and pass in any flash data if it exists
            res.render('login.ejs', { message: req.flash('loginMessage') }); 
        });
    
        // process the login form
        // app.post('/login', do all our passport stuff here);
    
        // =====================================
        // SIGNUP ==============================
        // =====================================
        // show the signup form
        app.get('/admin', function(req, res) {
    
            // render the page and pass in any flash data if it exists
            res.render('admin.ejs', { 
                message: req.flash('signupMessage'),
             });
        });

        // app.post('/signup', function(req, res) {
        //     console.log(res);
        //     alert("alerted.");
        // })
    
        app.post('/login', function(req, res) {
            console.log("LOGIN CONSOLE");
            // console.log(req);
        
            // var myObj = JSON.parse(req);
            // console.log(myObj._readableState);
            // console.log(res)
        })

        app.post('/admin', function(req, res){
            var httpServer;
            httpServer = http.Server(app);
            // console.log(req);
            res.setHeader('Content-Type', 'application/json');
            // serverFile.addBuildupSql("INSERT INTO AIRPORT VALUES('"+req.body.AirportCode+"', '"+req.body.AirportName+"', '"+req.body.AirportSize+"', '"+req.body.AirportType+"')");

            console.log('1');
            serverFile.simpleExecute(
                "INSERT INTO AIRPORT VALUES('"+req.body.AirportCode+"', '"+req.body.AirportName+"', '"+req.body.AirportSize+"', '"+req.body.AirportType+"')",
                {}, //no binds
                {
                    outFormat: serverFile.OBJECT
                }
            ).then(function(results) {
                console.log('9');
                res.send(results);
            })
            .catch(function(err) {
                next(err);
            });
            // serverFile.addTeardownSql({
            //     sql: "BEGIN sys.dbms_session.modify_package_state(sys.dbms_session.reinitialize); END;"
            // });
            // serverFile.executeQuery("INSERT INTO AIRPORT VALUES('"+req.body.AirportCode+"', '"+req.body.AirportName+"', '"+req.body.AirportSize+"', '"+req.body.AirportType+"')")
            // serverFile.createPool(
            //     {
            //             user          : dbConfig.user,
            //             password      : dbConfig.password,
            //             connectString : dbConfig.connectString
            //           }
                
            // ).catch(function(err) {
            //     console.error('Error occurred creating database connection pool', err);
            //     console.log('Exiting process');
            //     process.exit(0);
            // });
        
            
            //mimic a slow network connection
            // setTimeout(function(){
        
            //     res.send(JSON.stringify({
        
            //         AirportCode : req.body.AirportCode || null,
            //         AirportName: req.body.AirportName || null,
            //         AirportSize : req.body.AirportSize || null,
            //         AirportType : req.body.AirportType || null
                    
            //     }));
        
            // }, 1000)
        
            //debugging output for the terminal
        });
        
        //wait for a connection
        // app.listen(3000, function () {
        //   console.log('Server is running. Point your browser to: http://localhost:3000');
        // });
        // process the signup form
        // app.post('/signup', function(req, res) {
        // })
    
        // =====================================
        // PROFILE SECTION =====================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile.ejs', {
                user : req.user // get the user out of session and pass to template
            });
        });
    
        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
    };
    
    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
    
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
