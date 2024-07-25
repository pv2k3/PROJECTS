const express = require("express");
const {
    User,
    Laptop,
    Desktop,
    Accessory
} = require("../models/models")

const {
    getItemDetails,
    addItemInDB
} = require("../controller/controllers")

const router = express.Router();

router.get("/userRecord", async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
})

router.route("/products")
.get(async (req, res)=>{
    getItemDetails(req, res);
})
.post(async (req, res) => {
    addItemInDB(req, res);
})


module.exports = router;