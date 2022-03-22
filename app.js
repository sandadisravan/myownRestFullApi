const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/NameDB");
const nameSchema = new mongoose.Schema({
  name: String
});
const Name = mongoose.model("Name",nameSchema);

app.get("/names",function(req,res){
  Name.find({},function(err,output){
    if(output){
      res.send(output);
    }
  });
});
app.post("/names",function(req,res){
  const newName = new Name({
    name: req.body.name
  });
  newName.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("success");
    }
  });
});
app.delete("/names/:enteredname",function(req,res){
  console.log(req.params.enteredname);
  Name.deleteOne({name: req.params.enteredname},function(err){
    if(!err){
      res.send("success");
    }
    else{
      res.send(err);
    }
  });
});
app.listen(3000,function(){
  console.log("server has been started at port 3000");
});
