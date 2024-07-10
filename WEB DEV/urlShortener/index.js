
const express = require("express");
const path = require("path");

const {connectMongoDb} = require("./connect")
const {logRecord} = require("./middleware/middleware");
const router = require("./routes/routes");
const staticRouter = require("./routes/staticRoutes")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(__dirname))


connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

const PORT = 8000;

app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    logRecord(req, res, next, "log.txt");
});

app.use("/URL", router);
app.use("/", staticRouter)
app.listen(PORT, ()=>{
    console.log("Server Started")
})