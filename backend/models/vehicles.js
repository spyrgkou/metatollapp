const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleId: String,
    tagId: String,
    tagProvider: String,
    providerAbbr: String,
    licenseYear: Number
})

module.exports = mongoose.model("Vehicle", VehicleSchema);