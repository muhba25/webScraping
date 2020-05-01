
var firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyDQ3FjMlH4InK0DSrX__-H5yH2ZGjnyAd0",
  authDomain: "harvest-ce63f.firebaseapp.com",
  databaseURL: "https://harvest-ce63f.firebaseio.com",
  projectId: "harvest-ce63f",
  storageBucket: "harvest-ce63f.appspot.com",
  messagingSenderId: "1006657536755",
  appId: "1:1006657536755:web:d61143755dfc06f5712d86",
  measurementId: "G-GRRT58TCG1"
};

var fire = firebase.initializeApp(firebaseConfig);

module.exports = fire
