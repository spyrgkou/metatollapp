const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const path = require('path');
// const csvtojson = require('csvtojson');
// const Vehicle = require('./models/vehicles');
// const Station = require('./models/stations');
const Pass = require('./models/passes');
const ISODateFromString = require('./helpers');

const AdminRouter = require('./routes/adminRoutes');
const SearchRouter = require('./routes/searchRoutes');

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

const dbconfig = require('./config/dbconfig');
const passes = require('./models/passes');
mongoose.connect(dbconfig);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const baseurl="/interoperability/api";
app.use(baseurl, AdminRouter);
app.use(baseurl, SearchRouter);

app.get('/', (req, res)=>{
    res.send("Hello Metatoll!");
})


app.use('*', (req, res) => res.status(404).json({"Message":"Bad Request"}));
app.listen(9103, ()=>{
    console.log("'Serving on port 9103!")
})
