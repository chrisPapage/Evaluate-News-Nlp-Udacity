const dotenv = require('dotenv');
dotenv.config();

let projectData = {}

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");

const app = express()

/* Dependencies */
/* Middleware*/
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//set aylien API credentials
const aylienApi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.post('/save', function (req,res){
    projectData.name = req.body.name;
    console.log('Received')
    res.end();
});

app.get('/api', function(req,res){
    let result = '';
    aylienApi.sentiment({
        url: projectData.name,
        mode: 'document'
    },function(error,response){
        if (error === null){
            res.send(response);
        }
    }
    );
});

module.exports = app;