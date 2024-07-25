const express = require("express");
const {
    User,
    Accessory,
    Desktop,
    Laptop
} = require("../models/models")

const {
    addUser,
    openPage,
    loginUser
} = require("../controller/controllers");
const { getUser } = require("../services/auth");


const staticRouter = express.Router();

staticRouter
    .get("/home", (req, res) => {
        openPage(req, res, "home", "")
    })
    .get("/account", async (req, res) => {
        const userUid = req.cookies.uid;

        if (!userUid) {
            res.render("account", {
                type: "login"
            })
        }

        else {
            const userTokenData = getUser(userUid);
            const id = userTokenData.id;
            const userRecord = await User.findOne({
                _id: id,
            });

            res.render("account", {
                type: "none",
                user: userRecord,
                item: userRecord.itemsBought
            })
        }
    })
    .post("/account/login", async (req, res) => {
        loginUser(req, res);
    })
    .get("/account/signup", (req, res)=>{
        return res.render("account", {
            type: "signup"
        })
    })
    .post("/account/signup", (req, res) => {
        addUser(req, res);
    })
    .get("/store", (req, res) => {
        openPage(req, res, "store", "");
    })
    .get("/store/singleProduct", async (req, res) => {
        const product = req.query.item;
        const podType = req.query.type;
        var productDetails;
        if (podType == "laptop") {
            productDetails = await Laptop.findById(product);
        } else if (podType == "desktop") {
            productDetails = await Desktop.findById(product);
        } else if (podType == "accessory") {
            productDetails = await Accessory.findById(product);
        }

        res.render("singleProduct", {
            type: podType,
            id: productDetails._id,
            name: productDetails.productName,
            category: productDetails.category,
            qty: productDetails.qty,
            price: productDetails.price,
            image: productDetails.image,
            specification: productDetails.specification,
            description: productDetails.description
        });
    })

module.exports = staticRouter