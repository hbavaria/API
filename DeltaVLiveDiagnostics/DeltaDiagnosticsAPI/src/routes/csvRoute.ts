import express from "express";
//import PerformanceEntry  from '../models/performance/PerformanceEntry'
const mongoose = require('mongoose')
const router = express.Router();
router.post("/todos", async (req, res) => {
    try {
        res.send();
        let jsonObj = req.body
        mongoose.connect('mongodb://localhost:27017',
  //{ useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(`Error while connecting to database: ${err}`);
    } else {
      var mongoose = require("mongoose");
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
        default: "0"
    },
    End:{
        type: Date,
        default: "0"
    },
    Elapsed_Ms:{
        type: Number,
        default: 0
    }
});
      //getRungroup(jsonObj)
      let PerformanceEntry = mongoose.model(run_group,CsvSchema)
      saveData(jsonObj,CsvSchema,PerformanceEntry)
    }
  }
);
    } catch (error) {
      console.log(error);
    }

    async function saveData(jsonObj,CsvSchema, PerformanceEntry){
      let newName = []
      newName.push(await getCollectionNames())
      for(let index = 0; index < jsonObj.length; index ++){
        for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index][i]['Run Group']
          //let PerformanceEntry = mongoose.model(run_group,CsvSchema)
          for(let number = 0; number < newName.length; number ++){
            for(let k = 0; k < newName[number].length; k ++){
              if(run_group.toUpperCase() == newName[number][k].toUpperCase()){
                let newCsv = new PerformanceEntry({
                Node : jsonObj[index][i].Node,
                Session: jsonObj[index][i].Session,
                Run: jsonObj[index][i].Run,
                Run_Group: jsonObj[index][i]['Run Group'],
                Start: jsonObj[index][i].Start,
                End: jsonObj[index][i].End,
                Elapsed_Ms:jsonObj[index][i]['Elapsed Ms'] 
              })
              //mongoose.model(run_group)
            newCsv.save((err, result) => {
            if (err){
              console.log(err)
            }
          })
          }
          else {
            let newSave = new PerformanceEntry({
              Node : jsonObj[index][i].Node,
              Session: jsonObj[index][i].Session,
              Run: jsonObj[index][i].Run,
              Run_Group: jsonObj[index][i]['Run Group'],
              Start: jsonObj[index][i].Start,
              End: jsonObj[index][i].End,
              Elapsed_Ms:jsonObj[index][i]['Elapsed Ms']
            })
            //mongoose.model(run_group);
            newSave.save((err, result) => {
          if (err){
            console.log(err)
          }
          }) 
          }
          }
        }
      }
    }
}

    async function getCollectionNames(){
      let results = []
      return new Promise((resolve, reject) => {
        mongoose.connection.db.listCollections().toArray(function (err, names) {
        for(let index = 0; index < names.length; index ++){
          if (err) {
          reject(err);
          }
          let name = names[index].name
          let newName = name.substring(0, name.length - 1);
          results.push(newName)
          resolve(results)    
        }
        return results
      });
    })
    }  
  });
export = router;
