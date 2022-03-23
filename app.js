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
  name: String,
  meaning: String
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
app.delete("/names/",function(req,res){
  // console.log(req.params.enteredname);
  Name.deleteMany({},function(err){
    if(!err){
      res.send("success");
    }
    else{
      res.send(err);
    }
  });
});
app.get("/names/:enteredName",function(req,res){
  Name.find({name: req.params.enteredName},function(err,output){
    if(output){
      res.send(output);
    }
  });
});
app.put("/names/:enteredName",function(req,res){
  Name.updateOne({name: req.params.enteredName}, {name:req.body.name},{oldEnough: true},function(err){
    if(!err){
      res.send("Success updated please check get method for updated data");
    }
  });
});
app.patch("/names/:enteredName",function(req,res){
Name.updateOne(
  {name: req.params.enteredName},
  {$set: req.body},
  function(err){
    if(!err){
      res.send("success");
    }
    else{
      res.send(err);
    }
  }
)
});
app.delete("/names/:enteredName",function(req,res){
  // console.log(req.params.enteredname);
  Name.deleteOne({name:req.params.enteredName},function(err){
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
