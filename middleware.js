module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // req.session.redirectUrl = req.originalUrl;
        // req.flash("error","Login to add Listing");
        console.log("You must be login first");
        // res.redirect("/home");
       return res.redirect("/login");
    }
    next();
}