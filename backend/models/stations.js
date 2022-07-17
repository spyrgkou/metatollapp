const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    stationId: String,
    stationProvider: String,
    stationName: String
})

module.exports = mongoose.model("Station", StationSchema);