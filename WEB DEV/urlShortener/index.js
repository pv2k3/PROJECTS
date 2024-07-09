const express = require("express");

const {connectMongoDb} = require("./connect")
const {logRecord} = require("./middleware/middleware");
const router = require("./routes/routes");

const PORT = 8000;
const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    logRecord(req, res, next, "log.txt");
});

app.use("/URL", router);

app.listen(PORT, ()=>{
    console.log("Server Started")
})