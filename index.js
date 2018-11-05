var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 3000;

    
var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


app.use("/api/todos", todoRoutes);

app.get("/", function(req, res){
    res.sendFile("index.html");
});
    
app.listen(port, function(){
    console.log("Server started to listen on port " + process.env.PORT);
});