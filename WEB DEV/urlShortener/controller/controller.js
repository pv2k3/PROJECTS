const express = require("express")
const {URL} = require("../models/URL")
const shortid = require("shortid")

async function getAllShortIds(req, res){
    const urlDb = await URL.find();
    const html = `
    <ul>
        ${urlDb.map((url)=>`<li>${url.shortUrl} : ${url.normalUrl} : ${url.visitHistory.length}</li>`).join("")}
    </ul>
    `
    res.send(html);
}

async function addUrl(req, res){
    const body = req.body;
    if(!body || !body.normalUrl){
        return res.status(400).json({msg: "All fields are required"});
    }
    const result = await URL.create({
        shortUrl : shortid(),
        normalUrl : body.normalUrl, 
        visitHistory: []
    })

    return res.status(201).json({msg: "success"})
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