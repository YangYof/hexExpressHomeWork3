const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const databeaseUrl = process.env.DATABEASE_URL.replace("<password>",process.env.DATABEAS_PASSWORD);
const mongoose = require('mongoose');
mongoose.connect(databeaseUrl)
    .then(res=>{
        console.log("資料庫連線成功");
    })
    .catch((error)=>{
        console.error(error);
    })

const postRouter = require('./routes/posts');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    console.log(res.status);
    next()
})
app.use((req, res, next)=>{
    res.status(404).send('1234566')
})
app.use('/posts', postRouter);
module.exports = app;
