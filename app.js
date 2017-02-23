var express = require( 'express'), // is a mian middleware
bodyParser = require('body-parser'); // to parse req object

var samplejson= require('./sample.json');
var demojson= require('./innerFolder/demo.json');
// var  mongoDBCrudOperations= require('./innerFolder/mongoCrud.js');
var mongoDBCrudOperations1= require('./innerFolder/mongoCrud1.js');
var mongoDBCrudOperations2=require('./innerFolder/mongoCrud2.js');
var BL=require('./businessLogic.js');

var app = express();


// 200  -- sucess  201,202
// 400 -- bussiness errors, 401 -- , 402, 403
// 500 --- internal server errors;



app.use(bodyParser.json());

app.use('/api/crud',require('./innerFolder/mongoCrud.js')());
app.use('/api/recipting',require('./module/receipt.js')());

// app.post('/api/crud/',mongoDBCrudOperations);
// app.get('/api/crud/',mongoDBCrudOperations1);
// // app.put('/api/crud/',mongoDBCrudOperations3);
// app.delete('/api/crud/',mongoDBCrudOperations2);


// app.get('/demo1', function (req, res) {
//
//   // to rerive some data
//   //  res.json(sampleJson);
//   // console.log("fmen");
//   // if()
//    res.status(400).send({"error":"file is not defined"});
//   //res.send("this is a sample text")
// });
//
// app.get('/demo2', function (req, res) {
//   // to rerive some data
//    res.json(demojson);
//   //res.send("this is a sample text")
// });
//
//
// app.post('/demo1', BL);
//
// app.put('/demo1', function (req, res) {
//   // upate some data
//   res.send('Secret area');
// });
//
// app.delete('/demo1', function (req, res) {
//   // to delete data
//   res.send('Secret area');
// });

console.log("server running on the port 3000");
app.listen(3000);
