const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'))
app.use('/lib', express.static(__dirname + '/bower_components'))

//app.use(morgan('combined'));
// parse application/json
app.use(bodyParser.json())

app.post("/api/start", function (req, res) {
  var config = req.body
})

app.get('/api/stop', function(req, res) {

})

app.get('/api/switch/:state', function(req, res) {

})
