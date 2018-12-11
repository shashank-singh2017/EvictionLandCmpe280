createAdmin = function () {
    const monk = require('monk');
    const url = 'ds157843.mlab.com:57843/heroku_chtvczd0';
    const db = monk(url);
    var xlsx = require('xlsx');

    // Inserting into the mongodb users collection.
    const collection = db.get('users');
    const stateCollection = db.get('states');
    const USDataCollection = db.get('USData');
    const reportedCasesCollection = db.get('reportedCases');
    let userData = {
        userName: "Admin",
        email: "admin@gmail.com",
        password: "Admin123@",
        phone: "1234567891",
        role: "admin",
        state: "California"
    };

    let stateData = {states: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]}


    stateCollection.drop().then(() => {
        stateCollection.insert(stateData).then((dataInserted) => {
            console.log("State data inserted into the database.");
        }).catch((err) => {
            console.log("Error occured while inserting state data into the database");
        })
    });


    // Dont let a user signup if same email id is used.
    collection.drop().then(() => {
        collection.find({"email": userData.email}).then((data) => {
            if (data.length === 0) {
                collection.insert(userData).then((dataInserted) => {
                    console.log("signup successfull");
                    console.log("Data inserted into the database.");
                }).catch((err) => {
                    console.log("Error occured while inserting data into the database");
                }).then(() => {
                    db.close();
                })
            } else {
                console.log("An Account exists with the email provided");
                db.close();
            }
        });
    });

    //populate USData data
    var data = xlsx.readFile('./public/uploads/USDatafile-1541365702439.xlsx').Sheets.states;
    var USDATAJsonArray = xlsx.utils.sheet_to_json(data);
    USDataCollection.drop().then(() => {
        USDataCollection.insert(USDATAJsonArray).then((dataInserted) => {
            console.log("USDATA data inserted into the database.");
        }).catch((err) => {
            console.log("Error occured while inserting USDATA data into the database");
        })
    });

    //populate reported cases
    var data = xlsx.readFile('./public/data/data.xlsx').Sheets.Sheet1;
    var reportedCasesJsonArray = xlsx.utils.sheet_to_json(data);
    reportedCasesCollection.drop().then(() => {
        reportedCasesCollection.insert(reportedCasesJsonArray).then((dataInserted) => {
            console.log("reportedcases data inserted into the database.");
        }).catch((err) => {
            console.log("Error occured while inserting reportedcases data into the database");
        })
    });
};


module.exports = createAdmin();
