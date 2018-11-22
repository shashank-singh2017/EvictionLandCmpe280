const monk = require('monk');
const url = 'localhost:27017/cmpe280';
const db = monk(url);
var xlsx = require('xlsx');


module.exports.login = function (req, res) {
    res.render('../views/adminLogin', {
        message: "",
        error: ""
    });
};

module.exports.home = function (req, res) {
    const cases = db.get('USData');
    cases.find().then((results) =>{
        console.log(typeof results[0]._id.toString());

        res.render('../views/landing', {
        message: "",
        error: "",
        errorMsg: "",
        userdata: [],
        evictiondata: results
    });
    });

};

module.exports.showEvictionByState = function (req, res) {
    const state = req.query.state;
    console.log("Search: " + state);
    const cases = db.get('USData');
    cases.find({"name" : state}).then((results) => {
        res.render('../views/landing', {
            message: "",
            error: "",
            errorMsg: "",
            userdata: [],
            evictiondata: results
        });
    });
};

module.exports.handleSignin = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const collection = db.get('users');

    collection.find({"email": email}).then((data) => {
        console.log(data);
    if (email === data[0].email && password === data[0].password && data[0].role == "admin") {
        res.redirect('/admin/home');
    }
    else {
        res.render('../views/adminLogin', {
            message: "User with this Email Exists.",
            error: "Please enter correct password."
        });
    }
}).
    catch((err) => {
        console.log("Some error occured while signing in");
    res.render('../views/adminLogin', {
        message: "",
        error: "Invalid Username/Password"
    });
})
};

module.exports.handleAddDocument = function (req, res) {
    var data = xlsx.readFile('./public/uploads/' + req.file.filename).Sheets.FullExtStats;
    var statesJsonArray = xlsx.utils.sheet_to_json(data);

    if (statesJsonArray.length != 0 && statesJsonArray[0].year && statesJsonArray[0].state
        && statesJsonArray[0].County && statesJsonArray[0].fips && statesJsonArray[0].State_Reported_Cases) {
        const cases = db.get('reportedCases');
        cases.drop().then(() => {
            cases.insert(statesJsonArray).then((dataInserted) => {
            console.log("Data inserted into the database.");

        res.render('../views/landing', {
            message: "Data Inserted successfully",
            error: "",
            errorMsg: "",
            "userdata": []
        });
    }).
        catch((err) => {
            console.log("Error occured while inserting data into the database");
        res.render('../views/landing', {
            message: "",
            error: "Backend Error: Unable to insert data into database",
            errorMsg: "",
            "userdata": []
        });
    }).
        then(() => {
            db.close();
    })
    })
        ;

    } else {
        res.render('../views/landing', {
            message: "",
            error: "File is not in the required format",
            errorMsg: "",
            "userdata": []
        });
    }
};

module.exports.searchUser = function (req, res) {
    const selectedUser = req.query.user;
    console.log(selectedUser);
    if (!selectedUser || selectedUser == "") {
        res.render('../views/landing', {
            'data': "",
            "userdata": [],
            'selected': selectedUser,
            message: "",
            error: "",
            errorMsg: "Please enter user's email id."
        });
    }
    const collection = db.get('users');
    collection.find({"email": selectedUser}).then((data) => {
        console.log("Length : ", data.length);
    if (data.length === 0) {
        res.render('../views/landing', {
            'data': "",
            'userdata': [],
            'selected': selectedUser,
            message: "",
            error: "",
            errorMsg: "User not found"
        });
    }
    else {
        console.log(data);
        res.render('../views/landing', {
            'userdata': data,
            'selected': selectedUser,
            message: "",
            error: "",
            errorMsg: ""
        });
    }
})
    ;

};

module.exports.deleteUser = function (req, res) {
    var email = req.body.user;
    const collection = db.get('users');

    collection.find({"email": email}).then((data) =>
    {
        if(data.length === 0
)
    {

        res.send({
            status: "ok",
            'data': "",
            'userdata': [],
            'selected': email,
            message: "",
            error: "",
            errorMsg: "User not found"
        });
    }
else
    {
        collection.remove({"email": email}).then((data) =>
        {
            res.render('../views/landing', {
            'userdata': data,
            'selected': email,
            message: "",
            error: "",
            errorMsg: "user deleted"
        });
    })
        ;
    }
})
    ;
};

module.exports.updateUser = function (req, res) {
    console.log("user" + req.body.email);
    var email = req.body.email;
    const collection = db.get('users');

    collection.find({"email": email}).then((data) =>
    {
        console.log("results: " + data);
    if (data.length === 0) {
        res.send({
            status: "ok",
            'data': "",
            'userdata': [],
            'selected': email,
            message: "",
            error: "",
            errorMsg: "User not found"
        });
    }
    else {
        var newvalues = {$set: {userName: req.body.username, phone: req.body.number}};
        collection.update({"email": email}, newvalues).then((data) =>
        {
            console.log(data);
        res.render('../views/landing', {
            'userdata': [],
            'selected': email,
            message: "",
            error: "",
            errorMsg: "user updated"
        });
    })
        ;
    }
})
    ;
};


module.exports.handleAddUSDocument = function (req, res) {
    var data = xlsx.readFile('./public/uploads/' + req.file.filename).Sheets.states;
    var statesJsonArray = xlsx.utils.sheet_to_json(data);
    console.log(statesJsonArray);
    if (statesJsonArray.length != 0) {
        const cases = db.get('USData');
        cases.drop().then(() => {
            cases.insert(statesJsonArray).then((dataInserted) => {
            console.log("Data inserted into the database.");

        res.render('../views/landing', {
            message: "Data Inserted successfully",
            error: "",
            errorMsg: "",
            "userdata": []
        });
    }).
        catch((err) => {
            console.log("Error occured while inserting data into the database");
        res.render('../views/landing', {
            message: "",
            error: "Backend Error: Unable to insert data into database",
            errorMsg: "",
            "userdata": []
        });
    }).
        then(() => {
            db.close();
    })
    })
        ;
    } else {
        res.render('../views/landing', {
            message: "",
            error: "File is not in the required format",
            errorMsg: "",
            "userdata": []
        });
    }
};


module.exports.deleteEntry = function (req, res) {
    let id = req.body.id;

    const cases = db.get('USData');
    cases.findOneAndDelete({_id:id}).then((doc) =>{
        cases.find().then((results) =>{
            res.send(200, {
                message: "Success",
                error: "",
                errorMsg: "",
                userdata: [],
                evictiondata: results
            });
        });
    });

};
