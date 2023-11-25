const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const createError = require('http-errors');
const { notFoundHandler, errorHandler } = require('./middlewares/error');
const { authRouter } = require('./routes/auth');
const app = express();
dotenv.config();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));

const mongo = process.env.mongo;
const port = process.env.port;

//Routes
app.get('/', (req,res, next) => {
    // next(createError(403,'hello world'));
    res.status(200).json({
        msg: 'Hello From, Videology',
    });

});

app.use('/auth', authRouter);

//Not Found
app.use(notFoundHandler);

//Error Handler
app.use(errorHandler);

mongoose.connect(mongo).then(() => {
    server.listen(port, () => {
        console.log('Database Connected');
        console.log(`Server Running on PORT: ${port}`);
    })
}).catch((error) => {
    console.log(error);
});