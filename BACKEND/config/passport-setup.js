import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/userModel.js'

const google = passport.use(
  new GoogleStrategy({
    callbackURL: '/codingTest/api/v1/auth/google/redirect',
    clientID: '997261922744-3t42l5qkl57eqse5b43intg35rbbr49e.apps.googleusercontent.com',
    clientSecret: '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',
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id,role: req.query.state }).then(async currentUser => {
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