var express = require('express');
var Xray = require('x-ray');
var x = Xray();
var app = express();

var fire = require('./fire.js')
var bodyParser = require('body-parser')
var db = fire.firestore()

var router = require('express').Router()
router.use(bodyParser.json())




app.get('/covid-19', function(req, res){
	x('https://www.kompas.com/covid-19','div.covid__table div.covid__row',
		[{
			Provinsi: 'div.covid__prov ',
			Terkonfirmasi: 'div.covid__total span.-odp strong',
			Sembuh: 'div.covid__total span.-health strong',
			Meninggal: 'div.covid__total span.-gone strong'
		}]
		)(function(err, data) {
			return res.json(data);
		})

	});



module.exports = app;
// module.exports = router;

