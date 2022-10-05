const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    stationId: String,
    stationProvider: String,
    stationName: String,
    }
)

StationSchema.statics.findOperatorByStationId = async function(stationID) {
    const operator = (await this.findOne({stationId: stationID})).stationProvider;
    if (operator) {
        return operator;
    }else{
        throw Error('stationId not found!');
    }
}

module.exports = mongoose.model("Station", StationSchema);
  