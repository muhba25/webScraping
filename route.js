var Xray = require('x-ray');
var x = Xray();

var router = require('express').Router()

var fire = require('./fire.js')
var bodyParser = require('body-parser')
var db = fire.firestore()

router.use(bodyParser.json())


router.post('/post-data', (req, res)=>{
   x('https://www.kompas.com/covid-19','div.covid__table div.covid__row',
        [{
            Provinsi: 'div.covid__prov ',
            Terkonfirmasi: 'div.covid__total span.-odp strong',
            Sembuh: 'div.covid__total span.-health strong',
            Meninggal: 'div.covid__total span.-gone strong'
        }]
        ) .then(function(data) {
            
            db.settings({
                timestampsInSnapshots: true
            })

            // return res.json(data.length)
            for (var i = data.length - 1; i >= 1; i--) {
                db.collection('covid19_indo').add({
                    Provinsi: data[i]['Provinsi'],
                    Terkonfirmasi: data[i]['Terkonfirmasi'],
                    Sembuh: data[i]['Sembuh'],
                    Meninggal: data[i]['Meninggal'],
                    waktu: new Date()
                })

                res.send({
                    Provinsi: data[i]['Provinsi'],
                    Terkonfirmasi: data[i]['Terkonfirmasi'],
                    Sembuh: data[i]['Sembuh'],
                    Meninggal: data[i]['Meninggal'],
                    waktu: new Date()
                })
            }
            return res.json("post berhasil")
        
        
    })
        .catch(function(err) {
        console.log(err) // handle error in promise
    })
})


module.exports = router;
