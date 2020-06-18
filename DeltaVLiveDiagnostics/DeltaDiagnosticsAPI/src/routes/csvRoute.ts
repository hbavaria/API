import express from "express";
let timeStamp = require("mongoose-timestamp")
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
      saveData(jsonObj,CsvSchema)
    }
  }
);
    } catch (error) {
      console.log(error);
    }

    async function saveData(jsonObj,CsvSchema){
      let newName = []
      newName.push(await getCollectionNames())
      console.log(newName)
      for(let index = 0; index < jsonObj.length; index ++){
        for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index][i]['Run Group']
          mongoose.plugin(timeStamp)  //, {
            //createdAt: 'created_at',
            //updatedAt: 'updated_at'
         // });
          let PerformanceEntry = mongoose.model(run_group,CsvSchema,run_group)
          await saveColection(PerformanceEntry, jsonObj, index, i)
    }
}
    }
async function saveColection(PerformanceEntry, jsonObj, index, i){
  let newSave = new PerformanceEntry({
    Node : jsonObj[index][i].Node,
    Session: jsonObj[index][i].Session,
    Run: jsonObj[index][i].Run,
    Run_Group: jsonObj[index][i]['Run Group'],
    Start: jsonObj[index][i].Start,
    End: jsonObj[index][i].End,
    Elapsed_Ms:jsonObj[index][i]['Elapsed Ms']
  })
  newSave.save((err, result) => {
  if (err){
  console.log(err)
  }
  //console.log(newSave.createdAt)
  })   
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
          results.push(name)
          resolve(results)    
        }
        return results
      });
    })
    }  
  });
export = router;
