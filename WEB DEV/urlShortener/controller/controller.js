const {URL} = require("../models/URL")
const shortid = require("shortid")

async function getAllShortIds(req, res){
    const urlDb = await URL.find();
    res.render("listAll", {
        urls: urlDb
    })
}

async function addUrl(req, res){
    const body = req.body;
    if(!body || !body.url){
        return res.status(400);
    }
    const result = await URL.create({
        shortUrl : shortid(),
        normalUrl : body.url, 
        visitHistory: []
    })
    return res.status(201).render("home", {
        url: result.shortUrl
    })
}

async function getUrlByShortId(req, res){
    const shortUrl = req.params.shortUrl;
    const url = await URL.findOneAndUpdate({
        shortUrl}, {
            $push: {
                visitHistory: {timestamp : Date.now()}
            }
        })
    if(!url) return res.status(404).json({msg: "Error 404 file not found"});

    return res.redirect(url.normalUrl);
}

async function deleteByiD(req, res){
    await URL.findOneAndDelete(req.params.shortUrl);
    return res.json({msg: "success"});
}

module.exports = {
    getAllShortIds, 
    addUrl, 
    getUrlByShortId, 
    deleteByiD
}