var xlsx = require('xlsx');
const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);

module.exports.fetchData = function(req,res) {

        res.render('../views/linechart');
};

module.exports.fetchEvictionRates = function(req,res) {
    const selectedState = req.query.selectedState;
    const cases = db.get('USData');
    var dataJsonArray = [];
    var dataJsonArray2 = [];
    // var resData = [ {key: "Eviction rate",  values :[]} ];

    cases.find({"name": selectedState},
        { fields : {year: 1, evictionRate: 1,evictionFilingRate: 1, _id: 0}}
        ).then((docs)=>{
            for(var i= 0; i < docs.length; i++){
                dataJsonArray.push({
                    x: docs[i].year,
                    y: docs[i].evictionRate
                });
                dataJsonArray2.push({
                    x: docs[i].year,
                    y: docs[i].evictionFilingRate
                });
            }
        res.send(
            [
                {
                    key: "Eviction Rate",
                    values: dataJsonArray,
                    color: "#0000ff",
                    area: false
                },
                {
                    key: "Eviction Filing Rate",
                    values: dataJsonArray2,
                    color: "#95282a",
                    area: false
                }
            ]);
    });
            // resData[0]["values"] = docs;
};


