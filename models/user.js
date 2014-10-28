"use strict";

var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10); //10 is default, higher number longer it takes to hash and more secure password is
var passport = require("passport");
var passportLocal = require("passport-local");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [6,30]
      }
    },
    password: DataTypes.STRING
  }, {
    classMethods: { //setting up all logic for what is to come, none of this will happen till app.js is run
        encryptPass: function(password){ //when you first sign up
          var hash = bcrypt.hashSync(password, salt);
          return hash; //returns to us massive string
        },
        comparePass: function(userpass, dbpass){ //userpass is plain text, second one is a hashed password in db, always make sure it is in this order
          return bcrypt.compareSync(userpass, dbpass); //returns true if same, false if not
        },
        createNewUser: function(username, password, err, success){ //err and success are callbacks, this takes in a username and password and validates that they meet requirements
          if(password.length<6){
            err({message: "Password should be more than six characters"});
          }
          else{
            User.create({
              username: username,
              password: this.encryptPass(password)
            }).done(function(error, user){ //done is a sqlize method
              if(error){
                cosole.log(error)
                if(error.name === 'SequelizeValidationError'){
                  err({message: "Your username should be at least six characters long"})
                }
                else if(error.name === 'SequelizeUniqueConstraintError'){
                  err({message: "An account with the username already exists"})
                }
                else{
                  success({message: "Account created, please log in now"})
                }
              }
            });
          }
        },
      } //close classMethods
    } //close classMethods outer
    ); //close define user


//Passport

passport.use(new passportLocal.Strategy({
  usernameField: 'username', //need to match the name attributes in the login.ejs
  passwordField: 'password', //need to use 'usernameField' and 'passwordField'
  passReqToCallback: true    
},
  function(req, username, password, done){
    //find user in database
    User.find({
      where: {
        username: username
      }
    })
    //when that's done...
    //the done method here is SEQUELIZE
    .done(function(error,user){
      if(error) {
        console.log(error);
        return done(err, req.flash('loginMessage', 'Oops! Something went wrong'));
      }
      if(user === null){
        return done(null,false, req.flash('loginMessage', 'Username does not exist'));
      }
      if (User.comparePass(password, user.password) !==true){
        return done(null,false, req.flash('loginMessage', 'Invalid Password'));
      }
      done(null, user);
    });
}));

  return User;
}; //close User function
