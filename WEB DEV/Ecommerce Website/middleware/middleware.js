const fs = require("fs");

function logRecord(req, res, next, file){
    fs.appendFile(file, `${new Date()} : ${req.ip} : ${req.path} : ${req.method} \n`, (err, data)=>{
        next();
    })
}

module.exports = {logRecord};