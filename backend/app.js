const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const csvtojson = require('csvtojson');
const Vehicle = require('./models/vehicles');
const Station = require('./models/stations');
const Pass = require('./models/passes');

const AdminRouter = require('./routes/adminRoutes');

const dbconfig = require('./config/dbconfig');
mongoose.connect(dbconfig);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const baseurl="/interoperability/api";
app.use(baseurl, AdminRouter);

app.get('/', (req, res)=>{
    res.send("Hello Metatoll!");
})

// app.post('/interoperability/api/admin/resetstations', async(req, res)=>{
//     try {
//         await Station.deleteMany();
//         var arrayToInsert = [];
//         var stationFilename = 'backend/static/sampledata01_stations.csv';
//         await csvtojson().fromFile(stationFilename).then(csvdata=>{
//             for (var i=0; i<csvdata.length; i++){
//                 var oneRow = {
//                     stationId: csvdata[i]["stationID"],
//                     stationProvider: csvdata[i]["stationProvider"],
//                     stationName: csvdata[i]["stationName"]
//                 };
//                 arrayToInsert.push(oneRow);
//             }
//         });
//         Station.insertMany(arrayToInsert, (err, result)=>{
//             if (err) res.status(500).json({"Status":"Something went wrong!"});
//             if (result) {
//                 res.status(200).json({"Status":"OK"});
//             }
//         });
// 	} catch (error) {
//         res.status(500).json({"Status":"Something went wrong!"});
// 	}
//     await Station.deleteMany({});
//     arrayToInsert = [];
//     stationFilename = 'backend/static/sampledata01_stations.csv'
//     await csvtojson().fromFile(stationFilename).then(csvdata=>{
//         for (var i=0; i<csvdata.length; i++){
//             var oneRow = {
//                 stationId: csvdata[i]["stationID"],
//                 stationProvider: csvdata[i]["stationProvider"],
//                 stationName: csvdata[i]["stationName"]
//             };
//             arrayToInsert.push(oneRow);
//         }
//         Station.insertMany(arrayToInsert, (err, result)=>{
//             if (err) res.status(500).json({"Status":"Something went wrong!"});
//             if (result) {
//                 res.status(200).json({"Status":"OK"});
//             }
//         });
//     });
// });

app.post('/interoperability/api/admin/resetvehicles', async(req, res)=>{
    await Vehicle.deleteMany({});
    arrayToInsert = [];
    stationFilename = 'backend/static/sampledata01_vehicles_100.csv';
    await csvtojson().fromFile(stationFilename).then(csvdata=>{
        for (var i=0; i<csvdata.length; i++){
            var oneRow = {
                vehicleId: csvdata[i]["vehicleID"],
                tagId: csvdata[i]["tagID"],
                tagProvider: csvdata[i]["tagProvider"],
                providerAbbr: csvdata[i]["providerAbbr"],
                licenseYear: csvdata[i]["licenseYear"]
            };
            arrayToInsert.push(oneRow);
        }
        Vehicle.insertMany(arrayToInsert, (err, result)=>{
            if (err) res.status(500).json({"Status":"Something went wrong!"});
            if (result) {
                res.status(200).json({"Status":"OK"});
            }
        });
    });
});

app.use('*', (req, res) => res.status(404).json({"Message":"Bad Request"}));
app.listen(9103, ()=>{
    console.log("'Serving on port 9103!")
})

        // const db =  mongoose.createConnection(dbconfig).asPromise();
        // const session =  db.startSession();
        // session.then(() => Station.deleteMany()).then(Station.insertMany(arrayToInsert, (err, result)=>{
        //     if (err) res.status(500).json({"Status":"Something went wrong!"});
        //     if (result) {
        //         res.status(200).json({"Status":"Stations Successfully imported"});
        //     }
        // })).then(() => session.commitTransaction()).then(()=> session.endSession());