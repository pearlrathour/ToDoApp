const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

console.log(date);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

// const db = process.env.Dblink;
db= "mongodb+srv://pearlrathour:pR%4007142002@cluster0.wzyeuro.mongodb.net/todolistdb?retryWrites=true&w=majority"

mongoose.connect(db).then( () =>{
    console.log("Conn succ");
}). catch((err)=> console.log("No conn", err));

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified !"]
    }
});

const Task = mongoose.model("tasks", taskSchema);

// const item1 = new Task({
//     name: "Welcome !!"
// });

// const item2 = new Task({
//     name: "Hit the + button to add a new item"
// });

// const item3 = new Task({
//     name: "Hit the - button to delete"
// });

// const defaultItem = [item1, item2, item3];


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
    const item = new Task({
        name: newtaskname
    });
    item.save();
    res.redirect("/");
});

// app.post("/delete", function(req, res){
//     const checkedtaskid= req.body.checkbox;
//     Task.findByIdAndDelete("64cc9e2d6fdcc02f25070411");
//     // res.redirect("/");
// });

app.listen(4000);