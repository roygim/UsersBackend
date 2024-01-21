const express = require('express');
const bodyparser = require('body-parser');
const cors  = require('cors');
const { users } = require('./api');
const cookieParser = require('cookie-parser')
const { CORS_URL } = require('./config');

module.exports = async (app) => {

    app.use(bodyparser.json())
    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors({ origin: CORS_URL.split(','), credentials: true }));
    app.use(express.static(__dirname + '/public'))
    app.use(cookieParser())

    const router = express.Router();

    //api
    users(router);  
    
    app.use('/api', router);
}