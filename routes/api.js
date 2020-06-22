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
        let db = client.db('issue-tracker');

        db.collection(project).find(query).toArray((err, doc)=>{
          if (err) {
            console.error("Error encountered ", err);
            
          } else {
            res.send(doc)
          }
        })

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
            res.json({issue})
          }
        })
      })
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      let id = req.body._id;
      let updates = {
        issue_title: req.body.issue_title || '',
        issue_text: req.body.issue_text || '',
        created_by: req.body.created_by || '',
        assigned_to: req.body.assigned_to || '',
      status_text: req.body.status_text || ''
      }
      // delete any empty props
      for(let prop in updates){
        if (updates[prop]==='') {
          delete updates[prop]
        }
      }

      if (Object.keys(updates).length===0) {
        res.send("No updated fields sent");
      } else {

        updates.updated_on= new Date;
        updates.open = req.body.open === 'false' ? false: true;
        MongoClient.connect(CONNECTION_STRING, (err, client)=> {
          let db = client.db('issue-tracker')
          db.collection(project).findAndModify({_id: ObjectId(id)},
          {}, {$set: updates},
          {new: true},
          (err, doc)=> {
            (err) ? res.send('Could not update '+ id) : res.send('Successfully updated')
          }
          )
        })
      }
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
