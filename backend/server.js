const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const baseurl="/interoperability/api";

const AdminRouter = require('./routes/adminRoutes');
const SearchRouter = require('./routes/searchRoutes');
const AuthRouter = require('./routes/authRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(methodOverride('_method'));

const dbconfig = require('./config/dbconfig');
mongoose.connect(dbconfig);

// const connection_string = 'mongodb://127.0.0.1:27017/metatolldb';
// mongoose.connect(connection_string);

// const checkauth = require('./middleware/checkauth');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./swaggerdocs.yaml');
app.use(baseurl+'/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

app.get(baseurl, (req, res) => res.status(200).json({"Home": "Metatollapp"}));
app.use(baseurl, AuthRouter);
app.use(baseurl, AdminRouter);
app.use(baseurl, SearchRouter);

app.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).send(message);
})

app.use('*', (req, res) => res.status(404).json({"Message":"Bad Request"}));

app.listen(9103, ()=>{
    console.log("'Serving on port 9103!");
    console.log("Docs available at http://localhost:9103/interoperability/api/api-docs/");
});
