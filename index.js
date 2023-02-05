require('./src/config/config');
const express = require('express');
const app = express();
const db = require('./src/database/controller/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path =  require('path');

// Configuración del servidor
//app.use(express.static(path.resolve(__dirname, './uploads')));

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));


//app.use(require('morgan')(':method :url :status :res[content-length] - :response-time ms'))
// Router
app.use('/api', require('./src/router'));



app.listen(process.env.PORT || 5000, db);