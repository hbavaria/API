import express from "express";
import PerformanceEntry from "../models/performance/Csv";
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
      //getRungroup(jsonObj)
      saveData(jsonObj)
      //storeCollectionNames()
    }
  }
);
        //let jsonObj = req.body;
        //saveData(jsonObj)
        //collection()
    } catch (error) {
      console.log(error);
    }

    async function saveData(jsonObj){
      let newName = []
      newName.push(await getCollectionNames())
      for(let index = 0; index < jsonObj.length; index ++){
        for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index][i]['Run Group']
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
            newCsv.save((err, result) => {
            if (err){
              console.log(err)
            }
          })
          }
          else {
            let newCsv = new PerformanceEntry({
              Node : jsonObj[index][i].Node,
              Session: jsonObj[index][i].Session,
              Run: jsonObj[index][i].Run,
              Run_Group: jsonObj[index][i]['Run Group'],
              Start: jsonObj[index][i].Start,
              End: jsonObj[index][i].End,
              Elapsed_Ms:jsonObj[index][i]['Elapsed Ms'] 
            })
          newCsv.save((err, result) => {
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
