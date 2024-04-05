
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const firebaseConfig = {
    apiKey: "AIzaSyDNN9-luzGcXErX-Ndn5AnsOERNtYP5h2c",
    authDomain: "ping-c18f7.firebaseapp.com",
    projectId: "ping-c18f7",
    storageBucket: "ping-c18f7.appspot.com",
    messagingSenderId: "920758536251",
    appId: "1:920758536251:web:ce9e8bf604766a4811741e",
    measurementId: "G-XGQN6QEPCP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = firebase;