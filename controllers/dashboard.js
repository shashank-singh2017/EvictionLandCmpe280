var xlsx = require('xlsx');
var states = xlsx.readFile('./public/data/states.xlsx').Sheets.Sheet1;
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);


module.exports.fetchData = function (req, res) {
    const cases = db.get('USData');

    cases.find({"year": 2016}).then((results) => {
        res.render('../views/dashboard', {
            'data': results,
            'state': ""
        });
    });
};

module.exports.fetchDataByState = function (req, res) {
    //const selectedState = req.session.userSession[0].state;
    const selectedState = "California";

    console.log(selectedState);
    const cases = db.get('USData');
    var dataJsonArray = [];
    var dataAllYearsOfState = [];
    var rentBurdenAllYears = [];
    var poverty = [];
    cases.find(
        {"year": 2016}
    ).then((results) => {
        for (var i = 0; i < results.length; i++) {
            dataJsonArray.push({
                state: results[i].name,
                value: results[i].evictions
            });
        }

        cases.find({"name": selectedState}).then((results1) => {
            for (var i = 0; i < results1.length; i++) {
                dataAllYearsOfState.push({
                    year: results1[i].year,
                    value: results1[i].evictions
                });

                rentBurdenAllYears.push({
                    year: results1[i].year,
                    value: results1[i]["rent-burden"]
                });

                poverty.push({
                    year: results1[i].year,
                    poverty: results1[i]["poverty-rate"],
                    population: results1[i]["population"]
                });
            }

            var statesJsonArray = xlsx.utils.sheet_to_json(states);
            const cases = db.get('reportedCases');
            var rankingsJsonArray = [];

            cases.find({}, {sort: {State_Reported_Cases: -1}, limit:3}).then((results)=>{
                for(var i= 0; i < results.length; i++){
                    rankingsJsonArray.push({
                        rank: i+1,
                        state: results[i].state,
                        county: results[i].county,
                        case_numbers: results[i].case_numbers
                    });
                }
                res.render('../views/dashboard', {
                    'rankings':rankingsJsonArray,
                    'mapData': dataJsonArray,
                    'yearData': dataAllYearsOfState,
                    'state': selectedState,
                    'rentBurden': rentBurdenAllYears,
                    'poverty': poverty
                });
            });
        });


    });
};