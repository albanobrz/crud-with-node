const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const allowCors = require('./cors')

module.exports = () => {
    const app = express();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: "true"}))
    app.use(allowCors)
    consign().include("controllers").into(app)
    return app
}