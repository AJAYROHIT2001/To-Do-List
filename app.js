const express = require("express");
const bodyParser = require("body-parser");
const { getDay, getDate } = require("./date");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Planning is Imp", "Create Small Targets", "Focus on you're Target"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//Get Method
app.get("/", function(req,res){   
    let day = getDate();
    res.render("list",{
        listTitle:day, 
        newListItems: items});
});
//Post Method
app.post("/",function(req,res){
    let item =req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");  
    }
});

app.get("/work",function(req,res){
    res.render("list", {listTitle:"Work List" ,newListItems:workItems});
})
app.post("/work", function(req,res){
    let item = res.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

