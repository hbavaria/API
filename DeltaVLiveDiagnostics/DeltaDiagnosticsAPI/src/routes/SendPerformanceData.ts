import express from 'express'
import router from './auth'
const mongoose = require('mongoose')
//const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.get()
async function getCollectionNames(){
    let results = []
    return new Promise((resolve, reject) => {
      mongoose.connection.db.listCollections().toArray(function (err, names) {
      for(let index = 0; index < names.length; index ++){
        if (err) {
        reject(err);
        }
        let name = names[index].name
        results.push(name)
        resolve(results)    
      }
      return results
    });
  })
  }
  async function readData(){
    let newNames = []
    newNames.push(await getCollectionNames())
    console.log(newNames)
    MongoClient.connect(url, function(err, db) {
      var db = db.db('admin')
      for(let index = 0; index < newNames[0].length; index ++){
      db.collection(newNames[0][index], function(err, collection) {
        collection.find().toArray(function(err, items){
          console.log(items)
        })
      })
    }
    })
  }