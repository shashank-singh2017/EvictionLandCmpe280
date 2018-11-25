var xlsx = require('xlsx');
var states = xlsx.readFile('./public/data/states.xlsx').Sheets.Sheet1;
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);


module.exports.compareState = function (req, res) {
    res.render('../views/compareStates');
};
