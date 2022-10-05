const mongoose = require('mongoose');
const csvtojson = require('csvtojson');

const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');
const Pass = require('../models/passes');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// CSV file name
// const fileName = "sampledata01_stations.csv";
// var arrayToInsert = [];
// csvtojson().fromFile(fileName).then(source => {
//     // Fetching the all data from each row
//     for (var i=0; i<source.length; i++){
//         var oneRow = {
//             stationId: source[i]["stationID"],
//             stationProvider: source[i]["stationProvider"],
//             stationName: source[i]["stationName"]
//         };
//         arrayToInsert.push(oneRow);
//     }     //inserting into the table “employees”
//     var collectionName = "stations";
//     var collection = dbConn.collection(collectionName);
//     collection.insertMany(arrayToInsert, (err, result) => {
//         if (err) console.log(err);
//         if(result){
//             console.log("Import CSV into database successfully.");
//         }
//     });
// });
const stationFilename = 'sampledata01_stations.csv';

const stationsSeed = async() =>{
    await Station.deleteMany({});
    arrayToInsert = [];
    csvtojson().fromFile(stationFilename).then(source=>{
        for (var i=0; i<source.length; i++){
            var oneRow = {
                stationId: source[i]["stationID"],
                stationProvider: source[i]["stationProvider"],
                stationName: source[i]["stationName"]
            };
            arrayToInsert.push(oneRow);
        }
        Station.insertMany(source, (err, result)=>{
            if (err) console.log("Something went wrong with DB insert");
            if (result) {
                console.log("Import csv into database successfully.");
            }
        });
    });
};


// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price = Math.floor(Math.random() * 20) + 10;
//         const camp = new Campground({
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             image: 'https://source.unsplash.com/collection/483251',
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
//             price
//         })
//         await camp.save();
//     }
// }

        // vehicleID,tagID,tagProvider,providerAbbr,licenseYear
        // passID;timestamp;stationRef;vehicleRef;charge;;;;;;


        // var counter = 0;
        // const add10DaysPasses = async (counter) => {
        //     for(j=counter;j<=counter+10;j++){
        //         // counter++;
        //         var passFilename =__dirname+'/../static/days/day'+j.toString()+'.csv';
        //         await csvtojson().fromFile(passFilename).then(csvdata => {
        //             for (var i=0; i<csvdata.length; i++){
        //                 var oneRow = {
        //                     passId: csvdata[i]["passID"],
        //                     timeStamp: csvdata[i]["timestamp"],
        //                     stationRef: csvdata[i]["stationRef"],
        //                     vehicleRef: csvdata[i]["vehicleRef"],
        //                     charge: csvdata[i]["charge"]
        //                 };
        //                 arrayToInsert.push(oneRow);
        //             }
        //         });
        //     }
        //     Pass.insertMany(arrayToInsert, (err, result)=>{
        //         if (err) res.status(500).json({"Status":"Failed!"});
        //         if (result) {
        //             res.status(200).json({"Status":"OK"});
        //         }
        //     });
        //     counter=j;
        // }
        // if (counter<50){setTimeout(add10DaysPasses(counter),1000);}
        

stationsSeed().then(() => {
    mongoose.connection.close();
})