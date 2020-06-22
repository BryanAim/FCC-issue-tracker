/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

require('dotenv').config()

const CONNECTION_STRING = process.env.DB; 
MongoClient.connect(CONNECTION_STRING, function(err, client) {
  let db = client.db('issue-tracker')
  if (err) {
    return console.log("An error occured ", err)
  }
  console.log("Connected to database");
  
});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let title = req.body.issue_title;
      let text = req.body.issue_text;
      let creator= req.body.created_by;
      let assignedTo = req.body.assigned_to;
      let status = req.body.status_text

      var project = req.params.project;

      res.send('Hi')
      
      
    })
    
    .post(function (req, res){
      let title = req.body.issue_title;
      let text = req.body.issue_text;
      let creator= req.body.created_by;
      let assignedTo = req.body.assigned_to;
      let status = req.body.status_text
      var project = req.params.project;

      console.log(creator);
      
      
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
