createAdmin = function() {
    const monk = require('monk');
    const url = 'localhost:27017/cmpe280';
    const db = monk(url);
    // Inserting into the mongodb users collection.
    const collection = db.get('users');
    const stateCollection = db.get('states');

    let userData = {
        userName: "Admin",
        email: "admin@gmail.com",
        password: "Admin123@",
        phone: "1234567891",
        role: "admin"
    };

    let stateData = {states:["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]}


    stateCollection.drop().then(() => {
        stateCollection.insert(stateData).then((dataInserted) => {
            console.log("State data inserted into the database.");
        }).catch((err) => {
            console.log("Error occured while inserting state data into the database");
        })
    });


    // Dont let a user signup if same email id is used.
    collection.find({ "email" : userData.email}).then((data) => {
        if(data.length === 0) {
            collection.insert(userData).then((dataInserted) => {
                console.log("signup successfull");
                console.log("Data inserted into the database.");
            }).catch((err) => {
                console.log("Error occured while inserting data into the database");
            }).then(() => {
                db.close();
            })
        }else {
               console.log("An Account exists with the email provided");
               db.close();
        }
    })
};


module.exports = createAdmin();