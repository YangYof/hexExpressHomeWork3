const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const databaseUrl = process.env.DATABASE_URL.replace("<password>",process.env.DATABASE_PASSWORD);
const mongoose = require('mongoose');
mongoose.connect(databaseUrl)
    .then(res=>{
        console.log("資料庫連線成功");
    })
    .catch((error)=>{
        console.error(error);
    })

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
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
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);
module.exports = app;
