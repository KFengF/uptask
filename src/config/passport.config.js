const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UsersPromise = require("../models/users.model");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    //los valores tienen que ser los keys del model
    async (email, password, done) => {
      try {
        const Users = await UsersPromise;
        const user = await Users.findOne({ where: { email } });

        const isCorrect = await user.comparePasswords(password);

        return isCorrect
          ? done(null, user)
          : done(null, false, {
              message: "Credentials submitted are wrong"
            });
      } catch (error) {
        console.error(error);

        return done(null, false, {
          message: "Credentials submitted are wrong"
        });
      }
    }
  )
);

//Para poder enviar el usuario
passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

module.exports = passport;
