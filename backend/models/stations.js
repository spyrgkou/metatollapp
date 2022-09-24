const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    stationId: String,
    stationProvider: String,
    stationName: String,
    // methods: {
    //     findStationProviderFromStation(stationIdInput) {
    //         return this.find({stationId: stationIdInput});
    //     }
    // }
    // },
    // {
    //     statics: {
    //         findStationProviderByStationID(staID) {
    //             return this.findOne({stationId: staID}).stationProvider;
    //         }
    //     }
    }
)

module.exports = mongoose.model("Station", StationSchema);