var xlsx = require('xlsx');
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);


module.exports.fetchData = function(req,res) {
    const cases = db.get('USData');

    cases.find({"year":2016}).then((results)=>{
        res.render('../views/dashboard', {
            'data':results
        });
    });
};

module.exports.fetchDataByState = function(req,res) {
    const selectedState = req.session.userSession[0].state;
    console.log(selectedState);
    const cases = db.get('USData');
    var dataJsonArray = [];
    var dataAllYearsOfState = [];
    var rentBurdenAllYears = [];
    var poverty =[];
    cases.find(
            { "year":2016 }

    ).then((results)=>{
        for(var i= 0; i < results.length; i++){
            dataJsonArray.push({
                state: results[i].name,
                value: results[i].evictions
            });
        }


        cases.find({"name": selectedState}).then((results1)=>{
                for(var i= 0; i < results1.length; i++){
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
                        population : results1[i]["population"]
                    });
                }
            res.render('../views/dashboard', {'mapData':dataJsonArray,
                'yearData':dataAllYearsOfState,
                'state': selectedState,
                'rentBurden': rentBurdenAllYears,
                'poverty' : poverty
            });

        });


    });
};