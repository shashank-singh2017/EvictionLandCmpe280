var xlsx = require('xlsx');
var states = xlsx.readFile('./public/data/states.xlsx').Sheets.Sheet1;
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);


module.exports.compareState = function (req, res) {
    res.render('../views/compareStates');
};

module.exports.getData = function(req,res) {
    const selectedState = req.query.selectedState;
    var dataJsonArray= [];
    const collection = db.get('USData');

    // filter data based on selected state
    collection.find({"year":2016, "name": selectedState}).then((results)=>{
        dataJsonArray.push({
            'label': 'Evictions',
            'value':results[0]["evictions"]
        });
        dataJsonArray.push({
            'label': 'Eviction Rate',
            'value':results[0]["evictionRate"]
        });
        dataJsonArray.push({
            'label': 'Eviction Filing',
            'value':results[0]["eviction-filings"]
        });
        dataJsonArray.push({
            'label': 'Poverty Rate',
            'value':results[0]["poverty-rate"]
        });
        dataJsonArray.push({
            'label': 'Population',
            'value':results[0]["population"]
        });
        dataJsonArray.push({
            'label': 'Median Household Income',
            'value':results[0]["median-household-income"]
        });
        dataJsonArray.push({
            'label': 'Median Gross Rent',
            'value':results[0]["median-gross-rent"]
        });
        dataJsonArray.push({
            'label': 'Median Property Value',
            'value':results[0]["median-property-value"]
        });

        res.send({status:"ok",
            'data':dataJsonArray});

        // res.send(results);
    });
};