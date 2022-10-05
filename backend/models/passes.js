const mongoose = require('mongoose');
const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');

const PassSchema = new mongoose.Schema({
    passId: String,
    timeStamp: Date,
    stationRef: String,
    vehicleRef: String,
    charge: Number
})

PassSchema.statics.findPassesPerStation = async function(stationID, date_from, date_to) {
    const passesPerStationResults = await this.find({
        stationRef: stationID, 
        timeStamp: {$gte: date_from, $lt: date_to}
    });
    if (passesPerStationResults) {
        return passesPerStationResults;
    }else{
        throw Error('No passes found!');
    }
}

PassSchema.statics.findPassesAnalysis = async function(op1_ID, op2_ID, date_from, date_to) {
    const passesAnalysisResults = await this.find({
        stationRef: {$in: await Station.distinct("stationId",{stationProvider: op1_ID})},
        vehicleRef: {$in: await Vehicle.distinct("vehicleId",{tagProvider: op2_ID})},
        timeStamp: {$gte: date_from, $lt: date_to}
    });
    if (passesAnalysisResults) {
        return passesAnalysisResults;
    }else{
        throw Error('No passes found!');
    }
}

module.exports = mongoose.model("Pass", PassSchema);