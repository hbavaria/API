var mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
//import value from ('../routes/csvRoute')
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
        default: "0"
    },
    End:{
        type: Date,
        default: "0"
    },
    Elapsed_Ms:{
        type: Number,
        default: 0
    }
});
function PerformanceEntry(Node, Session, Run, Run_Group, Start, End, Elapsed_Ms){
    Node = this.Node
    Session = this.session
    Run = this.Run
    Run_Group = this.Run_Group
    Start = this.Start
    End = this.End
    Elapsed_Ms = this.Elapsed_Ms
}

         
module.exports = mongoose.model("Csv", CsvSchema);