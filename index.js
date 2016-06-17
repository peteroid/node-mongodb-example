/*
note: https://docs.mongodb.com/getting-started/node/query/
*/

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var _db = undefined
var _col = 'testing'

var connectDB = function () {
  return new Promise (function (resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      if (err != null) {
        reject(Error("Connection error"));
      } else {
        _db = db;
        resolve("success");
      }
    });
  })
}

var closeDB = function () {
  _db.close()
}

var insert = function (object) {
  return new Promise((resolve, reject) => {
    _db.collection(_col).insertOne(object, function(err, result) {
      if (err != null) {
        reject(Error("Insertion error"))
      } else {
        resolve("success")
      }
    });
  })
};

// leave queries null to query all
var query = function (queries) {
  return new Promise((resolve, reject) => {
    var cursor = _db.collection(_col).find(queries)
    cursor.toArray((err, bson) => {
      if (err != null) {
        reject("Query error")
      } else {
        resolve(bson)
      }
    })
  })
}

connectDB().then (function (result) {
  console.log("the database is up. hold on.")

  // insert({time: (new Date).getTime()}).then (result => {
  //   console.log("inserted")

  //   // closeDB()
  // }, err => {
  //   console.log(err)
  // })

  query({"a": "bdsfsdg"}).then (function (result) {
    console.log(result)
  }, err => {
    console.log(err)
  })
}, function (err) {
  console.log(err)
});
