import express from "express";
import PerformanceEntry from "../models/performance/Csv";
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
const router = express.Router();
router.post("/todos", async (req, res) => {
    try {
        res.send();
        let jsonObj = req.body;
        saveData(jsonObj)
    } catch (error) {
      console.log(error);
    }

    function saveData(jsonObj){
      let index;
      for(index = 0; index < jsonObj.length; index ++){
        for(let i = 0; i < jsonObj[index].length; i ++){
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
          console.log(result)
          })
        }
    }
    }
  });
  export = router;
