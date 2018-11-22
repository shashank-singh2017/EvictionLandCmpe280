var xlsx = require('xlsx');
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);

module.exports.fetchData = function(req,res) {

    res.render('../views/piechart');
};

module.exports.fetchDemographicData = function(req,res) {
    const selectedState = req.query.selectedState;
    const cases = db.get('USData');
    var dataJsonArray = [];
    var dataJsonArray2 = [];

    cases.find({
            $and : [
                { "year":2016 },
                { "name": selectedState}] },
            {
                fields: {_id: 0, "white":1,"afam":1, "hispanic":1,
                    "amind":1, "asian":1, "nhpi":1, "multiple":1, "other":1
                }
            }
    ).then((docs)=>{
        res.send([
            {
                "label":"White",
                "value":docs[0].white
            },
            {
                "label":"African-American",
                "value":docs[0].afam
            },
            {
                "label":"Hispanic",
                "value":docs[0].hispanic
            },
            {
                "label": "American Indian",
                "value": docs[0].amind
            },
            {
                "label": "Asian",
                "value": docs[0].asian
            },
            {
                "label": "nhpi",
                "value":docs[0].nhpi
            },
            {
                "label":"Multiple",
                "value":docs[0].multiple
            },
            {
                "label":"Other",
                "value":docs[0].other
            }
        ])
    });
    // resData[0]["values"] = docs;
};


