import express from 'express'
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017'
router.post("/nodeAverage" , async (req, res) => {
    try {
        let body = req.body
        let data = await getData(body)
        //console.log(body)
        res.send(data)
      } catch (error) {
        console.log(error);
      }
    async function getData(body){
        return new Promise(async (resolve, reject)=>{
            let dataBase = []
            let results = []
            let nodeData = []
            let runArray = []
            let Body = []
            let filteredArray = []
            let data = []
            let count = 0
            let start = false
            let runGroupArray = []
            let averages = []
            results.push(await setNames())
            Body.push(body)
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
            for(let i = 0 ; i < data.length; i++){
                for(let k = 0; k < runArray.length; k++){
                    if(data[i].Run == runArray[k]){
                        start = true
                    }
                }
                count ++
                if (count == 1 && start == false) { 
                    runArray.push(data[i].Run);
                }
                start = false
                count = 0
            }
            for(let i = 0 ; i < data.length; i++){
                for(let k = 0; k < runGroupArray.length; k++){
                    if(data[i].Run_Group == runGroupArray[k]){
                        start = true
                    }
                }
                count ++
                if (count == 1 && start == false) { 
                    runGroupArray.push(data[i].Run_Group); 
                }
                start = false
                count = 0 
            }
            for(let i = 0 ; i < data.length; i++){
                for(let k = 0; k < nodeData.length; k++){
                    if(data[i].Node == nodeData[k]){
                        start = true
                    }
                }
                count ++
                if (count == 1 && start == false) { 
                    nodeData.push(data[i].Node); 
                }
                start = false
                count = 0 
            }
            runArray.map(el => {
                let filteredArray = data.filter(dat => dat.Run === el);
                let avg = filteredArray.reduce((a, b) => a + parseInt(b.Elapsed_Ms), 0)/filteredArray.length;
                let appo_obj = {Name : el, Average: (Math.round(avg * 100) / 100).toFixed(2)};
                averages.push(appo_obj);
             })
             runGroupArray.map(el => {
                let filteredArray = data.filter(dat => dat.Run_Group === el);
                let avg = filteredArray.reduce((a, b) => a + parseInt(b.Elapsed_Ms), 0)/filteredArray.length;
                let appo_obj = {Name : el, Average: (Math.round(avg * 100) / 100).toFixed(2)};
                averages.push(appo_obj);
             })
             nodeData.map(el => {
                let filteredArray = data.filter(dat => dat.Node === el);
                let avg = filteredArray.reduce((a, b) => a + parseInt(b.Elapsed_Ms), 0)/filteredArray.length;
                let appo_obj = {Name : el, Average: (Math.round(avg * 100) / 100).toFixed(2)};
                averages.push(appo_obj);
             })
            if(Body[0][0] == ''){
                filteredArray = averages
            }
            else {
                filteredArray = averages.filter(n=> n.Name.toUpperCase().includes(Body[0][0].toUpperCase()))}
               resolve(filteredArray)
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