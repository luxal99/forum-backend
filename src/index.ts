import "reflect-metadata";
import {createConnection} from "typeorm";
import {App} from "./routes/app";
import bodyParser = require("body-parser");
import express = require("express");

const app = express();

app.use(bodyParser.json());


createConnection().then(async connection => {
    console.log('Connected to database')
}).catch(error => console.log(error));

const application = new App("user","category","topic","reply","message").app;
application.listen(8080,()=>{
    console.log("Listen on port 8080")
})
