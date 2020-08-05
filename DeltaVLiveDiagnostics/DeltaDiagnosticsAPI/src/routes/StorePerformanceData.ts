import express from "express";
const dateFormat = require('dateformat')
let url = 'mongodb://localhost:27017'
//let timeStamp = require("mongoose-timestamp")
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
mongoose.connect(url)
//   //{ useNewUrlParser: true, useUnifiedTopology: true },
      var Schema = mongoose.Schema;
      let CsvSchema = new Schema({
      Node: {
        type: String,
        default: "0"
      },
      Session: {
        type: Number,
        default: 0
      },
      Run: {
        type: String,
        default: "0"
      },
      Run_Group:{
        type: String,
        default: "0"
      },
      Start:{
        type: Date,
        default: Date.now()
      },
      End:{
        type: Date,
        default: Date.now()
      },
      Elapsed_Ms:{
        type: Number,
        default: 0
      }
});
const router = express.Router();
router.post("/todos", async (req, res) => {
        res.send();
        let jsonObj = req.body
        saveData(jsonObj,CsvSchema)
        storeDate(jsonObj, CsvSchema)
        //readData()

    async function saveData(jsonObj,CsvSchema){
      for(let index = 0; index < jsonObj.length; index ++){
        //for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index]['Run Group']
          let runGroup = 'PerfData_' + run_group
          //mongoose.plugin(timeStamp)
          let PerformanceEntry = mongoose.model(runGroup,CsvSchema,runGroup)
          await saveColection(PerformanceEntry, jsonObj, index)
    //}
    }
  }
async function saveColection(PerformanceEntry, jsonObj, index){
  let newSave = new PerformanceEntry({
    Node : jsonObj[index].Node,
    Session: jsonObj[index].Session,
    Run: jsonObj[index].Run,
    Run_Group: jsonObj[index]['Run Group'],
    Start: jsonObj[index].Start,
    End: jsonObj[index].End,
    Elapsed_Ms:jsonObj[index]['Elapsed Ms']
  })
  newSave.save((err, result) => {
  if (err){
  console.log(err)
  }
  })   
}
function setDate(jsonObj){
  let date = []
  for (let index = 0; index < jsonObj.length; index ++){
    let end = new Date(jsonObj[index].End)
    //let formattedDate = dateFormat(end, "yyyy-mm-dd'T'HH:MM:ss.ms")
    date.push(end)
  }
  //console.log(date)
  let maximumDate = new Date(Math.max.apply(null, date))
  // console.log(maximumDate)
  return maximumDate
}
async function storeDate(jsonObj, CsvSchema){
  let comparision = false
  let data = await getData()
  let readData = []
  readData.push(data)
  //console.log(jsonObj)
  if(jsonObj.length != 0){
  let names = []
  let name = await setNames()
  let index
  let date = setDate(jsonObj)
  let newDate = new Date(date)
  let newFormattedDate = dateFormat(newDate, "yyyy-mm-dd'T'HH:MM:ss.ms")
  for(let i = 0; i < jsonObj.length; i ++){
    let end = new Date(jsonObj[i].End)
    let formattedDate = dateFormat(end, "yyyy-mm-dd'T'HH:MM:ss.ms")
    if(formattedDate == newFormattedDate){
      index = i
    }
  }
  names.push(name)
let NodeEntry = mongoose.model("History", CsvSchema, "History")
if(names[0].length == 0){
  comparision = true
  saveNodeColection(NodeEntry, jsonObj, index)
  } if(names[0].length != 0) {
    for(let i = 0; i < readData[0].length; i++){
      if(readData[0][i].Node == jsonObj[index].Node){
        comparision = true
        NodeEntry.updateOne({'Node':jsonObj[0].Node}, {$set: {'End':jsonObj[index].End}}).exec()
      }
    }
    if(comparision == false){
      //console.log("wrong condition is excecuted")
      saveNodeColection(NodeEntry, jsonObj, index)
    }
  } 
  
}
}
async function setNames(){
  return new Promise((resolve, reject) =>{
      let results = []
      MongoClient.connect(url, function(err, db) {
      var db = db.db("admin")
      db.listCollections().toArray(async function (err, names) {
      for(let index = 0 ; index < names.length; index ++){
          let name = names[index].name
          if(name == "History"){
              let newName = name
              results.push(newName)
           }
      }
      if(names.length == 1){
        results = []
      }
      resolve(results)
      return results
  })
})
})
}
async function getData(){
  return new Promise(async (resolve, reject)=>{
      let results  =[]
      let data
      results.push(await setNames())
      //console.log(results)
      MongoClient.connect(url, async function(err, db) {
      var db = db.db("admin")
      for(let index = 0; index < results[0].length; index ++){
          data = await readData(db, results, index)
      }
      resolve(data)
      return data
  })
  })
}
async function readData(db, results, index){
  return new Promise((resolve, reject)=>{
  db.collection(results[0][index]).find().toArray((function(err, data){
      resolve(data)
      return data
  }))
  })
  }
  function saveNodeColection(NodeEntry, jsonObj, index){
    let newSave = new NodeEntry({
      Node : jsonObj[index].Node,
      Session: jsonObj[index].Session,
      Run: jsonObj[index].Run,
      Run_Group: jsonObj[index]['Run Group'],
      Start: jsonObj[index].Start,
      End: jsonObj[index].End,
      Elapsed_Ms:jsonObj[index]['Elapsed Ms']
    })
    newSave.save((err, result) => {
    if (err){
    console.log(err)
    }
    })   
  }
  })
export = router;
