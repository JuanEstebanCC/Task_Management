const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async (email,password,done) =>{
  const  user = await User.findOne({email});
  if(!user){
      return done(null,false,{message: 'Not user found'});
  }else{
    const match = await user.validatePassword(password)
    if(match){
        return done(null,user);
    }else{
        return done(null,false, {message: 'Incorrect password'})
    }
  }
}))

passport.serializeUser((user,done )=>{
    
})