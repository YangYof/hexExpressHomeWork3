const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const dataBaseUrl = process.env.DATABASE_URL.replace("<password>",process.env.DATABASE_PASSWORD);
const mongoose = require('mongoose');
mongoose.connect(dataBaseUrl)
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
    next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

app.use((req, res, next)=>{
    res.status(404).send('404 not found')
})

app.use((req, res, next)=>{
    res.status(500).send('請稍候嘗試')
})

module.exports = app;
