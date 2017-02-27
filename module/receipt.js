// var MongoClient = require('mongodb').MongoClient,
//     mongoUrl = 'mongodb://127.0.0.1:27017/demo',
//     db;
var express = require('express');
var bodyParser = require('body-parser');

function crudOperations() {
  
    var api = new express.Router(); // Router function

    api.use(bodyParser.json({
        limit: '5mb'
    }));


    api.get('/', function(req, res) {
        res.json({"msg":"hello"});
    });


    //
    // api.get('/details', function(req, res) {
    //     res.json({"msg":"hello we are in '/details' sub route"});
    // });
    // api.post('/', function(req, res) {
    //     res.json({"msg":"hello this is post method"});
    // });

    return api;
}
module.exports = crudOperations;
