if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const { getTodayDay, sortByDays ,generateRandom} = require("./utils/helper");
const session = require('express-session');
const methodOverride = require("method-override")
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { isLoggedIn } = require("./middleware");
const bodyParser = require('body-parser');
const cron = require('node-cron');
const quotes = require("./utils/quotes");


// Models
const Subject = require("./models/subject");
const Note = require("./models/notes");
const User = require("./models/user");
const CheckboxState = require("./models/checkboxState");

//Controller
const taskRouter = require("./routes/task");
const noteRouter = require("./routes/notes");
const userRouter = require("./routes/user");


// MongoDB setup
// const Mongo_URL = "mongodb://127.0.0.1:27017/tracking";
const databaseUrl = process.env.ATLAS_DB_URL;
main().then(res =>{
    console.log("Connected to Study-Track");
})
.catch(err =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(databaseUrl);
}


app.set("view engine","ejs");
app.set("views",path.join((__dirname),"views"));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(flash());
app.use(bodyParser.json());


const sessionOptions = {
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 *1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/",taskRouter);
app.use("/",noteRouter);
app.use("/",userRouter);



// State clearing at 12pm
cron.schedule('0 0 * * *', async () => {
    try {
        await CheckboxState.deleteMany({});
        console.log("Deleted all checkbox states at midnight");
    } catch (err) {
        console.error("Error deleting checkbox states:", err);
    }
});

// Terms and Conditions

app.get("/privacypolicy",(req, res)=> {
    res.render("others/privacy");
});
app.get("/terms&condition",(req, res)=> {
    res.render("others/termNCondition");
});

app.listen(8080,()=>{
    console.log("Server is listening");
});