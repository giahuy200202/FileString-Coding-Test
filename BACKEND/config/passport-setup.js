import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/userModel.js'

const google = passport.use(
  new GoogleStrategy({
    callbackURL: '/codingTest/api/v1/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id}).then(async currentUser => {
      if (currentUser) {
        // if(currentUser.role!==req.)

        done(null, currentUser)
      } else {
        const newUser = await User.create({
          email: profile.emails[0].value,
          password: 'googleaccount',
          type: 'google',
          class: [],
          notify: [],
          googleId: profile.id,
        })
        done(null, newUser)
      }
    })
  })
)

export default { google }