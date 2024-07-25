const {
    User,
    Laptop,
    Desktop,
    Accessory
} = require("../models/models")

const crypto = require("node:crypto");
const { setUser } = require("../services/auth")
const path = require("path")

async function loginUser(req, res) {
    const body = req.body;
    if (!body || !body.email || !body.password) {
        return res.status(400);
    }

    const userRecord = await User.findOne({
        email: body.email
    });

    const hashedPassword = crypto.createHmac("sha256", userRecord.salt).update(body.password).digest("hex");

    if (!userRecord || (hashedPassword!=userRecord.password)) {
        return res.render("account", {
            type: "login",
        })
    }

    const token = setUser(userRecord);

    res.cookie("uid", token);
    return res.render("account", {
        user : userRecord,
        type : "user",
        item: userRecord.itemsBought
    });
}

async function addUser(req, res) {
    const body = req.body;
    if (!body || !body.userName || !body.email || !body.password || !body.contact || !body.address) {
        return res.status(400);
    }
    const result = await User.create({
        userName: body.userName,
        email: body.email,
        password: body.password,
        contact: body.contact,
        address: body.address,
        role: "NORMAL",
        itemsBought: []
    })

    const token = setUser(result);

    res.cookie("uid", token);

    return res.status(201).render("account", {
        user: body,
        item: result.itemsBought
    })
}

// async function openPageAccount(req, res, path, parse){
//     const user = await Laptop.users
// }

async function openPage(req, res, path, parse) {
    const laptop = await Laptop.find();
    const desktop = await Desktop.find();
    const accessories = await Accessory.find();
    res.render(path, {
        list: [{
            item: laptop,
            type: "laptop"
        }, {
            item: desktop,
            type: "desktop"
        }, {
            item: accessories,
            type: "accessory"
        }]
    });
}


async function getItemDetails(req, res) {
    const type = req.query.type;
    var result;
    switch (type) {
        case "laptop":
            result = await Laptop.find();
            break;
        case "desktop":
            result = await Desktop.find();
            break;
        case "accessory":
            result = await Accessory.find();
            break;
        default:
            break;
    }
    res.json(result);
}

async function addItemInDB(req, res) {
    const type = req.query.type;
    const body = req.body;
    var result;
    if (
        !body || !body.productName || !body.category || !body.qty || !body.price || !body.image) {
        if ((type in ["laptop", "desktop"]) && !body.processor || !body.ram || !body.storage || !body.battery || !body.graphicCard) {
            res.status(400);
        }
        else if (type == "accessory" && !body.description) {
            res.status(400);
        }
    }
    const nonTechInfo = {
        productName: body.productName,
        category: body.category,
        qty: body.qty,
        price: body.price,
        image: "../img/" + body.image
    }
    switch (type) {
        case "laptop":
            result = await Laptop.create({
                ...nonTechInfo,
                specification: {
                    processor: body.processor,
                    ram: body.ram,
                    storage: body.storage,
                    battery: body.battery,
                    graphicCard: body.graphicCard
                }
            })
            break;
        case "desktop":
            result = await Desktop.create({
                ...nonTechInfo,
                specification: {
                    processor: body.processor,
                    ram: body.ram,
                    storage: body.storage,
                    battery: body.battery,
                    graphicCard: body.graphicCard
                }
            })
            break;
        case "accessory":
            result = await Accessory.create({
                ...nonTechInfo,
                description: body.description
            })
            break;
        default:
            break;
    }
    res.status(201).json({ msg: "success" });
}

module.exports = {
    addUser,
    openPage,
    getItemDetails,
    addItemInDB,
    loginUser,
}