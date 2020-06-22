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
//MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var query = req.query
      var project = req.params.project;

      MongoClient.connect(CONNECTION_STRING, (err, client)=>{

      })
      
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      let issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
      status_text: req.body.status_text,
      created_on: new Date(),
      updated_on: new Date(),
      open: true
      }

      MongoClient.connect(CONNECTION_STRING, (err, client)=>{
        let db = client.db('issue-tracker');
        db.collection(project).insertOne(issue, function(err, doc) {
          if (err) {
            console.error('Errror encountered', err);
            
          } else {
            
          }
        })
      })
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
