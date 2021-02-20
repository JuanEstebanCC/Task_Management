const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

require('./database/db');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(require('./controllers/send_mail/send_mail'));
app.use('/public', express.static('public'));
app.use(require('./controllers/authController'));
app.use(require('./controllers/taskController'))

app.set('port', process.env.PORT | 5004);

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
