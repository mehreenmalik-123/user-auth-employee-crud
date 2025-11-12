import config from "./src/DatabaseConn/config.js";   
import express from "express";
import router from "./src/Router/route.js";    
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(router);

const port = 5000;
app.listen(port,(req,res)=>{
    console.log('http://' + config.DB_Host + ':' + port);
});

