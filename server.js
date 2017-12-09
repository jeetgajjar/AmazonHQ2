// // var express = require('express');
// // var app = express();
// // var port = process.env.PORT || 8080;
// // // var mongoose = require('mongoose');
// // var passport = require('passport');


// // var oracledb = require('oracledb');
// // var dbConfig = require('./config/database.js');
// // var rowCount = 0;

// // app.get('/testServer', function(req, res) {

// oracledb.getConnection(
//     {
//       user          : dbConfig.user,
//       password      : dbConfig.password,
//       connectString : dbConfig.connectString
//     },
//     function(err, connection)
//     {
//       if (err) {
//         console.error(err.message);
//         return;
//       }
//       console.log('Connection was successful!');
      
//       connection.execute(
//         "SELECT * FROM V_MAIN",
//         // [180],
//         // { maxRows: 10 },  // a maximum of 10 rows will be returned.  Default limit is 100
//         [],
//         {resultSet:true,
//         prefetchRows: 25 // the prefetch size can be set for each que
//         },
//         function(err, result)
//         {
//           if (err) {
//              console.error('some error: '+ err.message); 
//              doRelease(connection);
//              return; 
//             }
//             // obj = {print: result};
//             // console.log("OBJ: "+obj);
//             // res.render('print', obj); 
//             // res.render('signup', obj); 
//             // fetchOneRowFromRS(connection, result.resultSet);
//           // console.log("result.metadata " + result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
//           // console.log("result.rows " + result.rows);     // [ [ 180, 'Construction' ] ]
//           doRelease(connection);
//         });
//         console.log()
//     });
// //   });

// // require('./config/passport')(passport); //pass passport for configuration

// // var obj = {};
// // app.get('/testServer', function(req, res){

// //     connection.execute('SELECT * FROM V_MAIN', function(err, result) {

// //         if(err){
// //             throw err;
// //         } else {
// //           res.render('testServer.ejs');
// //             // obj = {print: result};
// //             // console.log("OBJ: "+obj);
// //             // res.render('print', obj);                
// //         }
// //     });

// // });

// // // app.use(morgan('dev')); //log every request to console
// // // app.use(cookieParser()); //reads cookies (for auth)
// // // app.use(bodyParser()); //gets info from html forms

// // app.set('view engine', 'ejs'); //set up ejs for templating

// // // app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); //session secret
// // // app.use(passport.initialize());
// // // app.use(flash());

// // //routes
// // // require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// // app.listen(port);
// // console.log('Listening on port: ' + port);

// // function doRelease(connection)
// // {
// //   connection.close(
// //     function(err) {
// //       if (err) {
// //         console.error("doRelease " +err.message);
// //       }
// //     });
// // }

// // function fetchOneRowFromRS(connection, resultSet)
// // {
// //   resultSet.getRow( // get one row
// //     function (err, row)
// //     {
// //       if (err) {
// //         console.error("fetchonerowfromRS" + err.message);
// //         doClose(connection, resultSet); // always close the result set
// //       } else if (!row) {                // no rows, or no more rows
// //         doClose(connection, resultSet); // always close the result set
// //       } else {
// //         rowCount++;
// //         console.log("fetchOneRowFromRS(): row " + rowCount);
// //         console.log(row);
// //         fetchOneRowFromRS(connection, resultSet);
// //       }
// //     });
// // }
// // function doClose(connection, resultSet)
// // {
// //   resultSet.close(
// //     function(err)
// //     {
// //       if (err) { console.error("doClose"+err.message); }
// //       doRelease(connection);
// //     });
// // }

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
// // var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var oracledb = require('oracledb');
var dbConfig = require('./config/database.js');

// function createConnection(){
//   oracledb.getConnection(
//     {
//       user          : dbConfig.user,
//       password      : dbConfig.password,
//       connectString : dbConfig.connectString

//     }, function(err, connection) {
//       if(err) {
//         console.log(err);
//         return;
//       }
//       console.log("Connection was successful");
//     }
//   )
// };
function executeQuery(query) {
  console.log('4');
  console.log("EXECUTE QUERY getting connection");
  oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString

    }, function(err, connection) {
      if(err) {
        console.log("100: "+ err);
        return;
      }
      console.log('5');
      console.log("Connection was successful");
      connection.execute(query,
        [],
         function(err, result) {
        if(err) {
          console.log(err);
          return;
        }
        console.log('6');
        console.log("102: " + result);
        });
        console.log('7');
        connection.close(function(err){
          console.log("error: 7.1")
          return;
        });
      // connection.close(function(err){
      //   console.log("error at execute query: "+ err);
      //   // console.error(err.message);
      //   return;
      // });
      console.log("Closed connection.");
    });
}
module.exports.executeQuery = executeQuery;
// // mongoose.connect(configDB.url);
// oracledb.getConnection(
//     {
//       user          : dbConfig.user,
//       password      : dbConfig.password,
//       connectString : dbConfig.connectString
//     },
//     function(err, connection)
//     {
//       if (err) {
//         console.error(err.message);
//         return;
//       }
//       console.log('Connection was successful!');

//       connection.execute(
//         "SELECT * from V_MAIN ",
//         // query,
//         // [180],
//         // { maxRows: 10 },  // a maximum of 10 rows will be returned.  Default limit is 100
//         function(err, result)
//         {
//           if (err) { console.error(err.message); return; }
//           console.log(result.rows);  // print all returned rows
//         });
//       connection.close(
//         function(err)
//         {
//           if (err) {
//             console.error(err.message);
//             return;
//           }
//         });
//     });

// function initApp() {
//   app = express();
//   httpServer = http.Server(app);

//   app.use(morgan('combined')); //logger

//   app.use('/api', api.getRouter());

//   app.use(handleError);

//   httpServer.on('connection', function(conn) {
//       var key = conn.remoteAddress + ':' + (conn.remotePort || '');

//       openHttpConnections[key] = conn;

//       conn.on('close', function() {
//           delete openHttpConnections[key];
//       });
//   });

//   database.addBuildupSql(statement);

//   database.addTeardownSql(statement);

//   database.createPool(dbconfig)
//       .then(function() {
//           httpServer.listen(3000, function() {
//               console.log('Webserver listening on localhost:3000');
//           });
//       })
//       .catch(function(err) {
//           console.error('Error occurred creating database connection pool', err);
//           console.log('Exiting process');
//           process.exit(0);
//       });
// }
require('./config/passport')(passport) //pass passport for configuration


app.use(morgan('dev')); //log every request to console
app.use(cookieParser()); //reads cookies (for auth)
app.use(bodyParser()); //gets info from html forms

app.set('view engine', 'ejs'); //set up ejs for templating

app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); //session secret
app.use(passport.initialize());
app.use(flash());

// //routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.listen(port);
console.log('Listening on port: ' + port);
  


var Promise = require('es6-promise').Promise;
var async = require('async');
var pool;
var buildupScripts = [];
var teardownScripts = [];

module.exports.OBJECT = oracledb.OBJECT;

function createPool() {
    return new Promise(function(resolve, reject) {
        oracledb.createPool(
                {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
            function(err, p) {
                if (err) {
                    return reject(err);
                }

                pool = p;

                resolve(pool);
            }
        );
    });
}

module.exports.createPool = createPool;

function terminatePool() {
    return new Promise(function(resolve, reject) {
        if (pool) {
            pool.terminate(function(err) {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        } else {
            resolve();
        }
    });
}

module.exports.terminatePool = terminatePool;

function getPool() {
    return pool;
}

module.exports.getPool = getPool;

function addBuildupSql(statement) {
    // var stmt = {
    //     sql: statement.sql
    //     // binds: statement.binds || {},
    //     // options: statement.options || {}
    // }; 
    console.log("YOUR STATEMENT IS: " + statement);

    buildupScripts.push(statement);
}

module.exports.addBuildupSql = addBuildupSql;

function addTeardownSql(statement) {
    var stmt = {
        sql: statement.sql
        // binds: statement.binds || {},
        // options: statement.options || {}
    };

    teardownScripts.push(statement);
}

module.exports.addTeardownSql = addTeardownSql;

function getConnection() {
    return new Promise(function(resolve, reject) {
      console.log("POOLING CONNECTION");
        pool.getConnection(function(err, connection) {
            if (err) {
              console.log("ERROR: "+err)
                return reject(err);
            }
            console.log("ASYNC CONNECTION");
            async.eachSeries(
                buildupScripts,
                function(statement, callback) {
                  console.log("ABOUT TO EXECUTE STATEMENT " + statement.sql);
                    connection.execute(statement.sql, statement.binds, statement.options, function(err) {
                        callback(err);
                    });
                },
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    console.log("RESOLVING CONNECTION");
                    resolve(connection);
                }
            );
        });
    });
}

module.exports.getConnection = getConnection;

// function execute(sql, bindParams, options, connection) {
//     return new Promise(function(resolve, reject) {
//         connection.execute(sql, bindParams, options, function(err, results) {
//             if (err) {
//                 return reject(err);
//             }

//             resolve(results);
//         });
//     });
// }

// module.exports.execute = execute;

function releaseConnection(connection) {
    async.eachSeries(
        teardownScripts,
        function(statement, callback) {
            connection.execute(statement.sql, statement.binds, statement.options, function(err) {
                callback(err);
            });
        },
        function (err) {
            if (err) {
                console.error(err); //don't return as we still need to release the connection
            }

            connection.release(function(err) {
                if (err) {
                    console.error(err);
                }
            });
        }
    );
}

module.exports.releaseConnection = releaseConnection;

function simpleExecute(sql, bindParams, options) {
  console.log('2');
    options.isAutoCommit = true;
    return new Promise(function(resolve, reject) {
      console.log('3');
      // console.log("INSIDE PROMISE");
      executeQuery(sql);
      console.log('8');
      console.log("101 Executed:" + sql);
        // createConnection()
        //     .then(function(connection){
        //       console.log("INSIDE GET CONNECTION");
              
        //         execute(sql, bindParams, options, connection)
        //             .then(function(results) {
        //                 resolve(results);

        //                 process.nextTick(function() {
        //                     releaseConnection(connection);
        //                 });
        //             })
        //             .catch(function(err) {
        //                 reject(err);

        //                 process.nextTick(function() {
        //                     releaseConnection(connection);
        //                 });
        //             });
        //     })
        //     .catch(function(err) {
        //         reject(err);
        //     });
    });
}

module.exports.simpleExecute = simpleExecute;

