import express from 'express'
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.get("/send" , async (req, res) => {
    try {
        let data = await getData()
        let jsonData = JSON.parse(JSON.stringify(data))
        res.send(jsonData)
      } catch (error) {
        console.log(error);
      }
    async function getData(){
        return new Promise(async (resolve, reject)=>{
            let dataBase = []
            let results  =[]
            results.push(await setNames())
            MongoClient.connect(url, async function(err, db) {
            var db = db.db("admin")
            for(let index = 0; index < results[0].length; index ++){
                let data = await readData(db, results, index)
                dataBase.push(data)
            }
            for(let index = 0; index<dataBase.length; index ++){
                for(let i = 0; i < dataBase[index].length; i++){
                    dataBase[index][i].Start = new Date(dataBase[index][i].Start)
                    dataBase[index][i].End = new Date(dataBase[index][i].End)
                }
            }
            resolve(dataBase)
            return dataBase
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
                    resolve(results)
                }
            }
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
export = router;