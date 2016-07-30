/*
* SERVER CONFIGURATIONS
 */
require("babel-register");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 3000;

//================= GLOGAL FILTER =================//
router.use((req, res, next) => {
	// do logging
	console.log("Requesting: " + req.method + ' on ' + req.path);
	next(); // make sure we go to the next routes and don't stop here
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('public'));
app.listen(port);
//=================================================//
console.log('Please visit localhost:' + port);

