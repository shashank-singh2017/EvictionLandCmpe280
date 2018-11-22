module.exports.home = function(req,res) {

    console.log(req.session.userSession);

    if(!req.session.userSession) {
        res.render('../views/login',{
            message : "Please login to go to Homepage",
            error: "You are not logged in."
        });
    }
    else {
        res.render('../views/home');
    }
};

module.exports.index = function(req,res) {
    res.render('../views/index');
};

module.exports.ourteam = function(req,res) {
    if(req.session.userSession[0].email) {
        res.render('../views/ourteam');
    }
    else {
        res.render('../views/login');
    }
};

module.exports.shashank = function(req,res) {
    res.render('../views/shashank');
};

module.exports.arshdeep = function(req,res) {
    res.render('../views/Arshdeep');
};

module.exports.divya = function(req,res) {
    res.render('../views/divya');
};

module.exports.pavana = function(req,res) {
    res.render('../views/pavana');
};
