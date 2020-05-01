var express = require('express');
var Xray = require('x-ray');
var x = Xray();
var app = express();

var bodyParser = require('body-parser')
var firebase = require('./fire.js')
var db = firebase.database()
var cors = require('cors')
// var routeSaya = require('./route.js')

app.get('/covid19', function(req, res){
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

app.get('/datapos', function(req, res){
	x('https://www.kompas.com/covid-19','div.covid__table div.covid__row',
		[{
			Provinsi: 'div.covid__prov ',
			Terkonfirmasi: 'div.covid__total span.-odp strong',
			Sembuh: 'div.covid__total span.-health strong',
			Meninggal: 'div.covid__total span.-gone strong'
		}]
		).then(function(data) {

            // return res.json(data.length)
            for (var i = data.length - 1; i >= 0; i--) {
                db.ref('Covid19_Indonesia/'+data[i]['Provinsi']).set({
                    Provinsi: data[i]['Provinsi'],
                    Terkonfirmasi: data[i]['Terkonfirmasi'],
                    Sembuh: data[i]['Sembuh'],
                    Meninggal: data[i]['Meninggal'],
                    waktu: new Date()
                })

                //   db.ref('Covid19_Indonesia/'+data[i]['Provinsi']).push({
                //     Provinsi: data[i]['Provinsi'],
                //     Terkonfirmasi: data[i]['Terkonfirmasi'],
                //     Sembuh: data[i]['Sembuh'],
                //     Meninggal: data[i]['Meninggal'],
                //     waktu: new Date()
                // })

                // db.set(data[i]);

            // console.log(data[i])

            }
            console.log('Post Berhasil')
            return res.json('Post Berhasil');
    	
    	
    })
		.catch(function(err) {
    	console.log(err) // handle error in promise
    })

	});

// app.use(cors())
// app.use(bodyParser.json())
// app.use(routeSaya)


module.exports = app;

