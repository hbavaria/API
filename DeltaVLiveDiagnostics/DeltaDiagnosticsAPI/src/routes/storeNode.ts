import express from 'express'
const router = express.Router()
let url = 'mongodb://localhost:27017'
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
mongoose.connect(url)
      var Schema = mongoose.Schema;
      let CsvSchema = new Schema({
      Node: {
        type: String,
        default: "0"
      },
      End:{
        type: Date,
        default: Date.now()
      },
});
router.post("/node" , async (req, res) => {
    try {
        res.send()
        let Body = req.body
        saveData(Body,CsvSchema)
      } catch (error) {
        console.log(error);
      }
    async function saveData(Body,CsvSchema){
        let data = []
        let names = []
          let PerformanceEntry = mongoose.model("Node", CsvSchema, "Node")
          let results = await getData()
          let name = await setNames()
          names.push(name)
          data.push(results)
          console.log(Body.Node)
          //console.log(data[0][0].Node)
          if(names[0].length != 0){
          for (let index = 0; index < data[0].length; index++){
              if(data[0][index].Node == Body.Node){
                  console.log("If worked")
                  PerformanceEntry.updateOne({'Node':data[0][index].Node}, {$set: {'End':Body.End}}).exec()
                //   await saveColection(PerformanceEntry, Body)
              } else{
                console.log("else worked")  
                await saveColection(PerformanceEntry, Body)}
          }
        } else{await saveColection(PerformanceEntry, Body)}
          //await saveColection(PerformanceEntry, Body)
  }
async function saveColection(PerformanceEntry, Body){
  let newSave = new PerformanceEntry({
    Node : Body.Node,
    End: Body.End,
  })
  newSave.save((err, result) => {
  if (err){
  console.log(err)
  }
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
async function setNames(){
    return new Promise((resolve, reject) =>{
        let results = []
        MongoClient.connect(url, function(err, db) {
        var db = db.db("admin")
        db.listCollections().toArray(async function (err, names) {
        for(let index = 0 ; index < names.length; index ++){
            let name = names[index].name
            if(name == "Node"){
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
async function readData(db, results, index){
return new Promise((resolve, reject)=>{
db.collection(results[0][index]).find().toArray((function(err, data){
    resolve(data)
    return data
}))
})
}
    })
export = router