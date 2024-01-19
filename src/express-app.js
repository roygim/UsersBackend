const express = require('express');
const bodyparser = require('body-parser');
const cors  = require('cors');
const { users } = require('./api');

module.exports = async (app) => {

    app.use(bodyparser.json())
    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    const router = express.Router();

    //api
    users(router);  
    
    app.use('/api', router);
}