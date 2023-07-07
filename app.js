const express = require("express");
const bodyParser = require("body-parser");
const date= require(__dirname + "/date.js");

console.log(date);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( "public"));
app.set('view engine', 'ejs');

let items=["Learn DSA", "Practice Leetcode problems"];

app.get("/", function (req, res) {

    // var currentDay = today.getDay();
    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday"
    //         break;

    //     case 1:
    //         day = "Monday"
    //         break;

    //     case 2:
    //         day = "Tuesday"
    //         break;

    //     case 3:
    //         day = "Wenesday"
    //         break;

    //     case 4:
    //         day = "Thursday"
    //         break;

    //     case 5:
    //         day = "Friday"
    //         break;

    //     case 6:
    //         day = "Saturday"
    //         break;

    //     default:
    //         console.log("Error: current day is equal to : "+ currentDay)
    // }

    let day=date.getDate();
    console.log(day)
    res.render('list', { dayname: day, newtaskitem : items});
});

app.post("/", function(req,res){
    let item=req.body.newtask;
    items.push(item);
    res.redirect("/");
});

app.listen(4000);