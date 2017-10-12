var db=require('../ServerJS/neo4j');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(express.static('../www'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    next(); 
 });
app.listen(8000);
app.get('/',(req,res)=>{
res.json(db.names);
});