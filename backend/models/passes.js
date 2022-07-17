const mongoose = require('mongoose');

const PassSchema = new mongoose.Schema({
    passId: String,
    timeStamp: Date,
    stationName: String,
    stationRef: String,
    stationName: String
})

module.exports = mongoose.model("Pass", PassSchema);