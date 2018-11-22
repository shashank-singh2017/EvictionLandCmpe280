const monk = require('monk');

const url = 'localhost:27017/cmpe280';

const db = monk(url);

/*
 * Get Login Page
 * A user can login to the EvictionLand by hitting /users/login
 */
module.exports.login = function(req,res) {
    if(!req.session.userSession) {
        res.render('../views/login',{
            message :"",
            error:""
        });
    }
    else {
        res.redirect('/home');
    }
};

/*
 * Get Signup Page
 */
module.exports.signup = function(req,res) {
    const collection = db.get('states');
    collection.find().then((data) =>{

        res.render('../views/signup', {
            states: data[0].states
        });
    })

};

/*
 * Handle Signup
 */
module.exports.handleSignup = function(req,res) {
    console.log(req.body);

    // Inserting into the mongodb users collection.
    const collection = db.get('users');

    let userData = {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                    state: req.body.state
                };

    console.log("Inside handleSignup");

    // Dont let a user signup if same email id is used.
    collection.find({ "email" : req.body.email}).then((data) => {

        console.log("Length : ",data.length);

        if(data.length === 0) {
            collection.insert(userData).then((dataInserted) => {
                console.log("signup successfull");
                console.log("Data inserted into the database.");
                res.render('../views/login', {
                    message : "Sign up successful",
                    error:""
                });
            }).catch((err) => {
                console.log("Error occured while inserting data into the database");
                res.render('../views/signup');
            }).then(() => {
                db.close();
            })
        }
        else {
            res.render('../views/signup', {
                message : "An Account exists with the email provided",
                error:"An Account exists with the email provided"
            });
        }
    })
};

/*
 * Handle Signin
 */
module.exports.handleSignin = function(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    const collection = db.get('users');

    collection.find({ "email" : email}).then((data) => {
        if(email === data[0].email && password === data[0].password) {

            //save session into MongoDB
            req.session.userSession = data;
            res.redirect('/home');
        }
        else {
            res.render('../views/login',{
                message : "User with this Email Exists.",
                error: "Please enter correct password."
            });
        }
    }).catch((err) => {
        console.log("Some error occured while signing in");
        res.render('../views/login',{
            message : "",
            error: "Invalid Username/Password"
        });
    })
};

module.exports.logout = function(req,res) {

    req.session.destroy();
    req.session = null;

    res.render('../views/login',{
        message :"",
        error:""
    });
};
