const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
// const checkAuth = require('./middleware/checkauth');

// var jsonParser = bodyParser.json();

const AdminRouter = require('./routes/adminRoutes');
const SearchRouter = require('./routes/searchRoutes');
const AuthRouter = require('./routes/authRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(methodOverride('_method'));

const dbconfig = require('./config/dbconfig');
const checkauth = require('./middleware/checkauth');
// const users = require('./models/user');
mongoose.connect(dbconfig);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

// app.use('*', () => {
//     res.setHeader("X-OBSERVATORY-AUTH","TOKEN");
// })

const baseurl="/interoperability/api";

app.get(baseurl, (req, res) => res.status(200).json({"Home": "Metatollapp"}));
app.use(baseurl, AuthRouter);
app.use(baseurl, AdminRouter);
// app.use(checkAuth);
app.use(baseurl, SearchRouter);

app.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).send(message);
})

app.use('*', (req, res) => res.status(404).json({"Message":"Bad Request"}));

app.listen(9103, ()=>{
    console.log("'Serving on port 9103!")
})
