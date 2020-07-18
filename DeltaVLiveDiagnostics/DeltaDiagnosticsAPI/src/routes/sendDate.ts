import express from 'express'
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.get("/date" , async (req, res) => {
    try {
        let data
        let results = await setNames()
        if (results == []){
          data = new Date("1996-07-17T20:41:50.971Z")
        } else{
          data = await getData()
        }
          //data = await getData()
        //console.log(data)
        res.send(data)
      } catch (error) {
        console.log(error);
      }
      async function getData(){
        return new Promise(async (resolve, reject)=>{
            let dataBase = []
            let results  =[]
            let data = []
            results.push(await setNames())
            MongoClient.connect(url, async function(err, db) {
            var db = db.db("admin")
            for(let index = 0; index < results[0].length; index ++){
                let data = await readData(db, results, index)
                dataBase.push(data)
            }
            for(let index = 0; index<dataBase.length; index ++){
                for(let i = 0; i < dataBase[index].length; i++){
                  let createdAt = new Date(dataBase[index][i].createdAt)
                  data.push(createdAt)
                }
            }
            console.log(data.length)
            let maximumDate = new Date(Math.max.apply(null, data))
            //console.log(maximumDate)
            resolve(maximumDate)
            return maximumDate
        })
        })
    }
    function setNames(){
        return new Promise((resolve, reject) =>{
            let results = []
            MongoClient.connect(url, function(err, db) {
            var db = db.db("admin")
            db.listCollections().toArray(async function (err, names) {
            for(let index = 0 ; index < names.length; index ++){
                let name = names[index].name
                if(name.startsWith("PerfData_") == true){
                    let newName = name
                    results.push(newName)
                    //resolve(results)
                } else{
                  results = []
                }
                resolve(results)
            }
            //console.log(results)
            return results
        })
    })
    })
}
function readData(db, results, index){
    return new Promise((resolve, reject)=>{
    db.collection(results[0][index]).find().toArray((function(err, data){
        resolve(data)
        return data
    }))
})
}
    })
export = router