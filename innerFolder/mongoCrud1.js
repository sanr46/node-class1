var MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://127.0.0.1:27017/local',
    db;

var express = require('express');
var bodyParser = require('body-parser');

var crudOperations = function(req, res) {

    MongoClient.connect(mongoUrl, function(err, dbConn) {
        if (err) {
            console.e("mongoUrl", mongoUrl);
            console.e('Could not connect to MongoDB - has the data browser been upgraded? %s', err);
            res.status(400).send(err);
        }
        db = dbConn;

        db.collection('simple_collection').find().toArray(function(err, docs) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(docs);
            }

        });
        // Insert the docs

    });


};
module.exports = crudOperations;
