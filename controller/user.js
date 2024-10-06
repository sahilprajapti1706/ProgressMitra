const User = require("../models/user");

module.exports.renderSignupPage =  (req, res) =>{
    res.render("users/signup");
};

module.exports.signup = async(req,res,next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser, (err) => {
            if(err){
            return next(err);
            }
            //flash
            console.log(registeredUser);
            req.flash("success","Signup successful");
            res.redirect("/home")
        })        
        
    } catch (err) {
        next(err);
    }
    
};

module.exports.renderLoginPage = (req,res) => {
    res.render("users/login");
};

module.exports.login = async(req,res) =>{
    req.flash("success","Login Successful") ;
    res.redirect("/home");
};

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success","Logout Successful") ;
        res.redirect("/home");
    })
};