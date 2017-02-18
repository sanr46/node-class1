var express = require( 'express'), // is a mian middleware
bodyParser = require('body-parser'); // to parse req object
var app = express(); //

app.use(bodyParser.json());

// app.all('/demo1', function(req,res){
//   console.log("got the service hit");
//   res.send("this is the response");
// });

app.get('/demo1', function (req, res) {
  // to rerive some data
  res.send('Secret area');
});

app.post('/demo1', function (req, res) {
  // creating a new record
  console.log("req.body", req.body);
  res.send(req.body);
});

app.put('/demo1', function (req, res) {
  // upate some data
  res.send('Secret area');
});

app.delete('/demo1', function (req, res) {
  // to delete data
  res.send('Secret area');
});

console.log("server running on the port 3000");
app.listen(3000);
