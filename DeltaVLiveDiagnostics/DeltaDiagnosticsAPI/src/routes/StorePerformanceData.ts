import express from "express";
let url = 'mongodb://localhost:27017'
let timeStamp = require("mongoose-timestamp")
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
        //readData()

    async function saveData(jsonObj,CsvSchema){
      for(let index = 0; index < jsonObj.length; index ++){
        //for(let i = 0; i < jsonObj[index].length; i ++){
          let run_group = jsonObj[index]['Run Group']
          let runGroup = 'PerfData_' + run_group
          mongoose.plugin(timeStamp)
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
  })
export = router;
