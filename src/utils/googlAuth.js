

const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()
const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const jwt = require('jsonwebtoken');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   const user =  await prisma.user.findUnique({
        where: {
            googleId: profile.id
        }
    })

    console.log(profile);


    if (!user)
    {
         user = await prisma.user.create({
            data: {
                googleId: profile.id,
                email: profile.email,
                username: profile.displayName,
            }
        })
    }
        const jwtToken = jwt.sign(
            { userId: user.id, email: user.email, name:user.username }, // Payload (you can include any user info)
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiry time (e.g., 1 hour)
        );
        
        return done(null, {user,jwtToken});
    
  }
));





passport.serializeUser(function(user, done) {
    done(null, user);
  });


  passport.deserializeUser(function(user, done) {    
    done(null, user);
  });


