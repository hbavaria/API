import express from 'express'
const router = express.Router()
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.get("/send" , async (req, res) => {
    try {
         getCollectionNames().then((items) => {
             res.send(items)
         })
      } catch (error) {
        console.log(error);
      }
    function getCollectionNames(){
        return new Promise ((resolve, reject) => {
            MongoClient.connect(url, function(err, db) {
                if (err){
                    reject(err)
                }
                var db = db.db('admin')
                mongoose.connection.db.listCollections().toArray(function (err, names) {
                    resolve(getData(names, err, db).then((items) => {
                        return items
                    }))
                });
            })
        })
    }
    function getData(names, err, db){
        return new Promise ((resolve, reject) => {
            if(err){
                reject(err)
            }
            for(let index = 0; index < names.length; index ++){
                resolve(getResults(err, names, index, db). then((items) => {
                    return items
                }))
            }
        })
    }
    function getResults(err, names, index, db){
        return new Promise ((resolve, reject) =>{
            if (err) {
                reject(err);
                }
                let name = names[index].name
                const collection = db.collection(name)
                resolve(getCollection(collection).then((items) => {
                    return items
                }))
            })   
    }
    function getCollection(collection){
        return new Promise ((resolve, reject) => {collection.find().toArray(function(err, items){
            if(err){
                reject(err)
            }
            resolve(items)
            return items
        })
    })
    } 
})
export = router;