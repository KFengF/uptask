const passport = require("passport");

exports.authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash: true,
  badRequestMessage: "Both fields are required"
});

exports.isAuthenticated = (req, res, next) =>
  req.isAuthenticated() || req._parsedUrl.path === "/log-in"
    ? next()
    : res.redirect("/log-in");

exports.logOut = (req, res) =>
  req.session.destroy(() => res.redirect("/log-in"));
