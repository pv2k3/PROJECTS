const express = require("express");
const router = express.Router();
const {addUrl} = require("../controller/controller");


router
.get("/", (req, res)=>{
    res.render("home");
})
.post("/", (req, res) => {
    addUrl(req, res);
})

module.exports = router