import express from 'express'
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.get("/rungroup" , async (req, res) => {
    try {
        let data = await getRunGroup()
        let jsonData = JSON.parse(JSON.stringify(data))
        res.send(jsonData)
      } catch (error) {
        console.log(error);
      }

      async function getRunGroup(){
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
                }
            }
            for(let index = 0; index < results.length; index ++){
                let name = results[index]
                results[index] = name.substr(9)
                //console.log(name.substr(9))
                resolve(results)
            }
            return results
        })
    })
    })
      }
    })
export = router