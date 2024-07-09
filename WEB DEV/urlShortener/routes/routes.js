const express = require("express")
const {
    getAllShortIds,
    addUrl,
    getUrlByShortId, 
    deleteByiD
} = require("../controller/controller");
const { model } = require("mongoose");
const router = express.Router();

router
.get("/", (req, res)=>{
    getAllShortIds(req, res);
})
.post("/", (req, res) => {
    addUrl(req, res);
})

router.route("/:shortUrl")
.get((req, res)=>{
    getUrlByShortId(req, res);
})
.delete((req, res) => {
    deleteByiD(req, res);
})

module.exports = router;