const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
// require('../database/db');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.set('port', process.env.PORT | 5004);

app.listen(app.get('port'), () => {
     console.log(`Server on port ${app.get('port')}`);
});