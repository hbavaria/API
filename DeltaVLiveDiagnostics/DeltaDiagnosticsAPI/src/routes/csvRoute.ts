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
      getRungroup(jsonObj)
      saveData(jsonObj)
      getCollectionNames()
    }
  }
);
        //let jsonObj = req.body;
        //saveData(jsonObj)
        //collection()
    } catch (error) {
      console.log(error);
    }

    function saveData(jsonObj){
      for(let index = 0; index < jsonObj.length; index ++){
        for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index][i]['Run Group']
          if(run_group == 'Display_NavigationBar'){
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
          //console.log(result)
          })
        }
    }
  }
}

    function getCollectionNames(){
      mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
          console.log(err);
        } else {
         console.log(names);
         let name = names[0].name
         let newName = name.substring(0, name.length - 1);
         console.log(newName) 
        }
  
        mongoose.connection.close();
      });
    }
  function getRungroup(jsonObj){
      for(let index = 0; index < jsonObj.length; index ++){
        for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index][i]['Run Group']
          console.log(run_group)
        }
      }
     }
  });
  export = router;
