const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/portal/users_model")
const {getAllLeads,getAddLeadView,addLead,checkLeadView,checkLead,getImportExcelView,importExcel} = require('./controllers/portal/leadController');
// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))
// parse requests of content-type - application/json
app.use(bodyParser.json())

dotenv.config();
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(express.json());

// connect db
mongoose.connect(
  process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log(`connect database success`)
);

app.use(require("express-session")({
  secret: "Any normal Word", //decode or encode session
  resave: false,
  saveUninitialized: false
}));
passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(passport.initialize());
app.use(passport.session());


// <<<<<<<<<<<<<<<< P O R T A L   A P P   R O U T E S <<<<<<<<<<<<<<<<<<<<<<<<
app.get("/", (req, res) => {
  res.render("home");
})

app.get("/userprofile",isLoggedIn ,(req,res) =>{
  res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
  res.render("login");
});

app.post("/login",passport.authenticate("local",{
  successRedirect:"/allLeads",
  failureRedirect:"/login"
}),function (req, res){

});

app.get("/register",(req,res)=>{
  res.render("register");
});

app.post("/register",(req,res)=>{
  
  User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("register");
      }
  passport.authenticate("local")(req,res,function(){
      res.redirect("/login");
  })    
  })
})

app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

app.get("/allLeads", isLoggedIn, getAllLeads);
app.get("/addLead", isLoggedIn, getAddLeadView);
app.post("/addLead", isLoggedIn, addLead);
app.get("/checkLead", isLoggedIn, checkLeadView);
app.post("/checkLead", isLoggedIn, checkLead);
app.get("/importExcel", isLoggedIn, getImportExcelView);
app.post("/importExcel", isLoggedIn, importExcel);

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<<<<<<<<<< A P I   R O U T E S <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const getcallResultRoute = require('./routes/api/getCallResult.route')
const resendVMGRoute = require('./routes/api/resendVMG.route')
const kycRoute = require('./routes/api/kyc.route')
const leadStatus = require('./routes/api/leadStatus.route')
const facebook = require('./FacebookAds/server')
// const sendCampaignRoute = require('./routes/sendCampaign.route')
// const getCusInfo = require('./routes/cusInfo.route')
// using as middleware
const VERSION = process.env.VERSION
app.use(VERSION + '/callResult', getcallResultRoute)
app.use(VERSION + '/resend', resendVMGRoute)
app.use(VERSION + '/kyc', kycRoute)
app.use(VERSION + '/leadStatus', leadStatus)
app.use(VERSION + '/facebook', facebook)
// app.use('/api/v3/sendCampaign', sendCampaignRoute)
// app.use('/api/v3/cusInfo',getCusInfo)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});