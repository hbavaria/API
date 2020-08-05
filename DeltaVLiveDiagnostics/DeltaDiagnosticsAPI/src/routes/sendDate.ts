import express from 'express'
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.get("/date" , async (req, res) => {
  //let collection = true;
    try {
      let finalResults = []
        let data
        let results = await setNames()
        finalResults.push(results)
        if (finalResults[0].length == 0){
          data = new Date("1996-07-17T20:41:50.971Z")
        } else{
        data = await getData()
        }
        //console.log(data)
        res.send(data)
      } catch (error) {
        console.log(error);
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