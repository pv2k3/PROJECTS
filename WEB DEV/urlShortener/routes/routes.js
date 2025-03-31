const express = require("express")
const {
    getAllShortIds,
    addUrl,
    getUrlByShortId, 
    deleteByiD
} = require("../controller/controller");
const router = express.Router();

router
.get("/", (req, res)=>{
    const urlDb = getAllShortIds(req, res);
})

router.route("/:shortUrl")
.get((req, res)=>{
    getUrlByShortId(req, res);
})
.delete((req, res) => {
    deleteByiD(req, res);
})

module.exports = router;