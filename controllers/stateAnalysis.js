const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);
const fs = require('fs');

var stateCentroids = JSON.parse(fs.readFileSync("./public/data/stateCentroids.geojson", 'utf8'));

module.exports.fetchData = function (req, res) {
    const cases = db.get('USData');
    var dataAllYearsOfState = [];
    var propData = []

    cases.find({"year": 2016}).then((results) => {
        const evictionGeoJSON = joinData(results, stateCentroids);

        cases.find({"name": "California"}).then((usData)=>{
            for (var i = 0; i < usData.length; i++) {
                dataAllYearsOfState.push({
                    year: usData[i].year,
                    value: usData[i].evictions
                });

                propData.push({
                    year: usData[i].year,
                    value:usData[i].population
                })
            }

            res.render('../views/stateAnalysis', {
                'evictionGeoJSON': evictionGeoJSON,
                'usData':results,
                'trendLine': dataAllYearsOfState,
                'propLine': propData
            });
        });

    });
};

module.exports.getDataByState = function (req, res) {
    const cases = db.get('USData');
    var dataAllYearsOfState = [];
    var propData = []
    var state = req.query.state;
    var prop = req.query.property;
    cases.find({"name": state}).then((usData)=>{
        for (var i = 0; i < usData.length; i++) {
            dataAllYearsOfState.push({
                year: usData[i].year,
                value: usData[i].evictions
            });

            propData.push({
                year: usData[i].year,
                value:usData[i][prop]
            })
        }

        res.json({
            'trendLine': dataAllYearsOfState,
            'propLine': propData
        });
    });

};

function joinData(data, usGeoJSON) {
    var  byState = {};

    for (var i = 0; i < usGeoJSON.features.length; i++) {
        byState[usGeoJSON.features[i].properties.name] = usGeoJSON.features[i];
    }

    for (i = 0; i < data.length; i++) {
        byState[data[i].name].properties = {
            'name' : data[i].name,
            'eviction-filings' : data[i]["eviction-filings"]
        };
    }

    byState["Alabama"].properties = {
        "year": 2016,
        "name": "Alabama",
        "parent-location": "USA",
        "eviction-filings": 2064,
        "evictionFilingRate": 1.97
    }

    byState["Puerto Rico"].properties = {
        "year": 2016,
        "name": "Puerto Rico",
        "parent-location": "USA",
        "eviction-filings": 0,
        "evictionFilingRate": 1.97
    }

    var newFeatures = [];

    for (i in byState) {
        newFeatures.push(byState[i]);
    }

    usGeoJSON.features = newFeatures;

    console.log(JSON.stringify(usGeoJSON, null,2));
    return usGeoJSON;
}