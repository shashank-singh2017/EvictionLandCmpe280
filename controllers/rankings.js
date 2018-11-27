var xlsx = require('xlsx');
var states = xlsx.readFile('./public/data/states.xlsx').Sheets.Sheet1;
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);

/*
 *
 * Get Rankings home page
 * A user can see top 10 cities with highest eviction rates by hitting /rankings/
 *
 */
module.exports.rankings = function(req,res) {
    var statesJsonArray = xlsx.utils.sheet_to_json(states);
    const cases = db.get('reportedCases');
    var dataJsonArray = [];

    cases.find( {},{sort: {case_numbers: -1}, limit:10}).then((results)=>{
       for(var i= 0; i < results.length; i++){
            dataJsonArray.push({
                rank: i+1,
                state: results[i].state,
                county: results[i].county,
                case_numbers: results[i].case_numbers
            });
       }
       console.log(results);
       res.render('../views/rankings', {
            'data':dataJsonArray,
            'states':statesJsonArray,
            'selected':"Select a state"
       });
    });

};


/*
 *
 * Get county rankings by state
 * A user can see top 10 county in a particular with highest eviction rates by hitting /rankings/state
 *
 */
module.exports.countyRankingsByState = function(req,res) {
    const selectedState = req.query.selectedState;
    var statesJsonArray = xlsx.utils.sheet_to_json(states);
    var dataJsonArray= [];
    const cases = db.get('reportedCases');

    cases.find({ "state": selectedState}, {sort: {case_numbers: -1}, limit:10}).then((results)=>{
        for(var i= 0; i < results.length; i++){
            dataJsonArray.push({
                rank: i+1,
                state: results[i].state,
                county: results[i].county,
                case_numbers: results[i].case_numbers
            });
        }
        console.log(results);
        res.render('../views/rankings', {
            'data':dataJsonArray,
            'states':statesJsonArray,
            'selected':"Select a state"
        });
    });

};

