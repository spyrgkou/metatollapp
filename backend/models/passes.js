const mongoose = require('mongoose');

const PassSchema = new mongoose.Schema({
    passId: String,
    timeStamp: Date,
    stationRef: String,
    vehicleRef: String,
    charge: Number
})

module.exports = mongoose.model("Pass", PassSchema);