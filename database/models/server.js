const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
        _id: String,
        prefix: String,
        autorol: Number,
        botrole: Number,
        welcomeImg: String,
        welcomeMs: String,
        byeImg: String,
        byeMsg: String,

        users: Map,
        roles: Map
})

module.exports = mongoose.model("server", ServerSchema);