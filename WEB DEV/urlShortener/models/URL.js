const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortUrl : {
        type: String,
        required: true,
        unique: true
    },
    normalUrl: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory : [{timestamp : {
        type : String
    }}]
}, {timestamps: true})

const URL = mongoose.model("url", urlSchema);

module.exports = {URL};