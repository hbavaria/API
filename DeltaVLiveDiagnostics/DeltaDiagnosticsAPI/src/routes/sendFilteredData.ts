import express from 'express'
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.post("/sendFilteredData" , async (req, res) => {
    try {
        //let jsonData = JSON.parse(JSON.stringify(data))
        //res.send()
        let body = req.body
        let data = await getData(body)
        let jsonObj = JSON.parse(JSON.stringify(data))
        res.send(jsonObj)
        console.log(body)
      } catch (error) {
        console.log(error);
      }
    async function getData(body){
        return new Promise(async (resolve, reject)=>{
            let filter = []
            filter.push(body)
            let serachObject = filter[0][0]
            let number;
            let date;
            try{
                number = +serachObject
            } catch(eroor){
                number = 0
            }
            try{
                date = new Date(serachObject)
            } catch(eroor){
                date = null
            }
            
            //let Filter = "bav"
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
                    dataBase[index][i].Start = new Date(dataBase[index][i].Start)
                    dataBase[index][i].End = new Date(dataBase[index][i].End)
                }
            }
            for(let index = 0; index < dataBase.length; index ++){
                data = data.concat(dataBase[index])
            }
            //for(let i = 0; i < data.length; i ++){
                //filteredArray.push(data.filter((Filter.toUpperCase())))
            //}
            let filteredArray = data.filter(d=> d.Node.toUpperCase().includes(serachObject.toUpperCase()) || d.Session == number || d.Run.toUpperCase().includes(serachObject.toUpperCase()) || d.Run_Group.toUpperCase().includes(serachObject.toUpperCase()) || d.Start == serachObject || d.Elapsed_Ms >= number)
            resolve(filteredArray)
            //console.log(JSON.parse(JSON.stringify(filteredArray)))
            //console.log(filteredArray.length)
            return filteredArray
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