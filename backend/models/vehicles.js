const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleId: String,
    tagId: String,
    tagProvider: String,
    providerAbbr: String,
    licenseYear: Number
})

VehicleSchema.statics.findTagProviderByVehicleId = async function(vehicleID) {
    const operator = (await this.findOne({vehicleId: vehicleID})).tagProvider;
    if (operator) {
        return operator;
    }else{
        throw Error('stationId not found!');
    }
}

module.exports = mongoose.model("Vehicle", VehicleSchema);