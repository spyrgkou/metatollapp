const Pass = require('../models/passes');
const csvtojson = require('csvtojson');

module.exports = async (req, res) => {
	try {
        await Pass.deleteMany();
        var arrayToInsert = [];
        // var passFilename =__dirname+'/../static/sampledata01_passes100_8000.csv';
        for(let i=0;i<=10;i++){
            var passFilename =__dirname+'/../static/days/day'+i.toString()+'.csv';
            await csvtojson().fromFile(passFilename).then(csvdata=>{
                for (var i=0; i<csvdata.length; i++){
                    var oneRow = {
                        passId: csvdata[i]["passID"],
                        timeStamp: csvdata[i]["timestamp"],
                        stationRef: csvdata[i]["stationRef"],
                        vehicleRef: csvdata[i]["vehicleRef"],
                        charge: csvdata[i]["charge"]
                    };
                    arrayToInsert.push(oneRow);
                }
            });
        }

        Pass.insertMany(arrayToInsert, (err, result)=>{
            if (err) res.status(500).json({"Status":"Failed!"});
            if (result) {
                res.status(200).json({"Status":"OK"});
            }
        });
	} catch (error) {
        res.status(500).json({"Status":"Something went wrong!"});
	}
};