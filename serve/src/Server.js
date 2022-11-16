const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const body_parser = require('body-parser');
const app = express();
const morgan = require('morgan');
const User = require('./routes/UserAPI');
require('dotenv').config();


app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(express.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use('/api/users', User);
app.use(morgan());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected :D || port:27017");
    }).catch((error) => {
        console.log(error.message);
    });


app.get('/', function(req, res) {
    res.status(200).json({
        Nombre: 'Edgar Esau Zelaya Moran',
        Carrera: 'Lic Ciencias de la Computacion',
        Carnet: "ZM01135974"
    });
});

app.listen(app.get('port'), () => {
    console.log("Runnig || port:", app.get('port'));
});