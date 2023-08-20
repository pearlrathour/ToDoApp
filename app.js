const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const { endpoint, Port } = require('./config');

console.log(date);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

db= process.env.DB_URL

mongoose.connect(db).then( () =>{
    console.log("Conn succ");
}). catch((err)=> console.log("No conn", err));

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified !"]
    },
    motivation: {
        type: String,
        default: "Do not postpone"
    }
});

const Task = mongoose.model("tasks", taskSchema);


app.get("/", function (req, res) {
    let day = date.getDate();
    
    // async function find(req, res) {
    //     try {
    //         const foundtasks = await Task.find();

    //         if (foundtasks.length === 0) {
    //             await Task.insertMany(defaultItem);
    //             res.redirect("/");
    //         }
    //         else {
    //             res.render('list', { dayname: day, newtaskitem: foundtasks });
    //         }
    //     }
    //     catch (error) {
    //         console.error("Error fetching tasks:", error);
    //     }
    // }


    Task.find()
        .then(function (foundtasks) {
            res.render('list', { dayname: day, newtaskitem: foundtasks });
        })
        .catch(function (error) {
            console.error("Error fetching tasks:", error);
        });
});

app.post("/", function (req, res) {
    const newtaskname = req.body.newtask;
    const motivationtext=req.body.motivationtext || "Do not postpone"
    const item = new Task({
        name: newtaskname,
        motivation: motivationtext
    });
    item.save();
    
    res.redirect("/");
});

app.post("/del", function(req, res){
    const checkedtaskid= req.body.checkbox;
    Task.findByIdAndDelete(checkedtaskid)
        .then(res.redirect("/"))
        .catch(function (error) {
            console.error("Error fetching tasks:", error);
        });
});

app.listen(process.env.Port);