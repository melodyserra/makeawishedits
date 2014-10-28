var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require('method-override'),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  session = require("cookie-session"),
  db = require("./models/index"),
  flash = require('connect-flash'),
  app = express();


app.set('view engine', 'ejs');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({extended: true}) );

app.use(methodOverride('_method'));

//Home aka WishList Index
app.get('/', function(req,res){
	// db.Wish.findAll().done(function (err, wishes){
    //   res.render('wishes/show', {allWishes: wishes});
	// })
    res.render('wishes/show');
});

//Admin Page-Authentication
//set up our session
app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  // this is in milliseconds
  maxage: 3600000
  })
);

// get passport started
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// prepare our serialize functions, serialize our user when they are authenticated successfully
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.User.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){
      done(error, user);
    });
});


// app.get("/post", isAuthenticated, function(req,res){
// 	res.render("account/post", {user : req.user});
// 	// in views file
// });

app.get('/admin', function(req,res){
  if(!req.user) {
    res.render("authentication/login_signup", { username: ""});
  }
  else{
    res.redirect('/post');
  }
});

app.get('/post', function(req,res){
  if(!req.user) {
    res.redirect("/admin");
  }
  else{
    res.render('account/post');
  }
});

// on submit, create a new users using form values
app.post('/signup', function(req,res){

  db.User.createNewUser(req.body.username, req.body.password,
  function(err){
    res.render("authentication/login_signup", {message: err.message, username: req.body.username});
  },
  function(success){
    res.redirect("/admin", {message: success.message});
  });
});

// authenticate users when logging in - no need for req,res passport does this for us
app.post('/login', passport.authenticate('local', {
  successRedirect: '/post',
  failureRedirect: '/admin',
  failureFlash: true
}));

app.get('/logout', function(req,res){
  //req.logout added by passport - delete the user id/session
  req.logout();
  res.redirect('/');
});

app.listen(3000, function(){
  "Server is listening on port 3000";
});