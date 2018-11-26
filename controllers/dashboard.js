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
    var stackedChartData = [];
    var populationVariation = [];
    var poverty = [];
    cases.find({"year": 2016}).then((results) => {
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
                    value: results1[i]["poverty-rate"]
                });

                poverty.push({
                    year: results1[i].year,
                    poverty: results1[i]["poverty-rate"],
                    population: results1[i]["population"]
                });

                if(results1[i].year %2 == 0){
                    var values = [];
                    values.push({
                        value : results1[i]["rent-burden"] / 4,
                        rate : "Rent burden"
                    });
                    values.push({
                        value : results1[i]["eviction-rate"],
                        rate : "Eviction rate"
                    });
                    stackedChartData.push({
                        categorie : results1[i].year,
                        values : values
                    });
                }

                if(results1[i].year == 2016){
                    populationVariation.push({
                        "label" : "White",
                        "value" : results1[i]["pct-white"]
                    });

                    populationVariation.push({
                        "label" : "African American",
                        "value" : results1[i]["pct-af-am"]
                    });

                    populationVariation.push({
                        "label" : "Hispanic/Latinx",
                        "value" : results1[i]["pct-hispanic"]
                    });

                    populationVariation.push({
                        "label" : "Asian",
                        "value" : results1[i]["pct-asian"]
                    });

                    populationVariation.push({
                        "label" : "Other",
                        "value" : results1[i]["pct-am-ind"] + results1[i]["pct-nh-pi"] + results1[i]["pct-multiple"] + results1[i]["pct-other"]
                    });
                }
            }

            var statesJsonArray = xlsx.utils.sheet_to_json(states);
            const rankings = db.get('reportedCases');
            var rankingsJsonArray = [];

            rankings.find({}, {sort: {State_Reported_Cases: -1}, limit: 3}).then((results) => {
                for (var i = 0; i < results.length; i++) {
                    rankingsJsonArray.push({
                        rank: i + 1,
                        state: results[i].state,
                        county: results[i].county,
                        case_numbers: results[i].case_numbers
                    });
                }

                var rank = 0;
                var evictionRate = 0;
                cases.find({"year": 2016}, {sort: {evictions: -1}}).then((results2) => {
                    for (var i = 0; i < results2.length; i++) {
                        if (results2[i].name == selectedState) {
                            rank = i;
                            evictionRate = results2[i].evictions;
                        }
                    }
                    res.render('../views/dashboard', {
                        'rankings': rankingsJsonArray,
                        'mapData': dataJsonArray,
                        'yearData': dataAllYearsOfState,
                        'state': selectedState,
                        'rentBurden': rentBurdenAllYears,
                        'poverty': poverty,
                        'stateData': {
                            'rank': rank,
                            'evictionRate': evictionRate
                        },
                        'stackedChartData' : stackedChartData,
                        'pieChartData' : populationVariation
                    });
                });

            });
        });


    });
};