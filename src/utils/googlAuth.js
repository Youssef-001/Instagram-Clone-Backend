

const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/AppError.js');
const prisma = new PrismaClient()
const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   const existingUser =  await prisma.user.findUnique({
        where: {
            googleId: profile.id
        }
    })

    console.log(profile);


    if (!existingUser)
    {
        const user = await prisma.user.create({
            data: {
                googleId: profile.id,
                email: profile.email,
                username: profile.displayName,
            }
        })
    }
    return done(null, profile);
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
  });


  passport.deserializeUser(function(user, done) {    
    done(null, user);
  });


