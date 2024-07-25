const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const {connectMongoDb} = require("./connection")
const {logRecord} = require("./middleware/middleware");
const router = require("./routes/routes");
const staticRouter = require("./routes/staticRoutes")
const buyRouter = require("./routes/buyroutes");
const {
    restrictToUserLogin,
    restrictToUserAdmin
} = require("./middleware/auth")

const app = express();


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser())
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: false}))


connectMongoDb("mongodb://127.0.0.1:27017/ecommerce-website");

const PORT = 8000;

app.use((req, res, next) => {
    logRecord(req, res, next, "log.txt");
});

app.use("/data", restrictToUserAdmin, router);
app.use("/", staticRouter);
app.use("/buy", restrictToUserLogin, buyRouter);

app.listen(PORT, ()=>{
    console.log("Server Started")
})