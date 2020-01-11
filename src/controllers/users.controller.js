const bcrypt = require("bcryptjs");
const UsersPromise = require("../models/users.model");

exports.signUp = (req, res) => {
  res.render("sign-up.view.pug", { pageTitle: "Sign Up" });
};

exports.postSignUp = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", ["Passwords don't match"]);

    return res.render("sign-up.view.pug", {
      pageTitle: "Sign Up",
      messages: req.flash(),
      //Esto tiene que tener el mismo nombre que res.locals
      email
    });
  }

  bcrypt.hash(password, 10, async (error, hash) => {
    try {
      if (error) throw Error(error);

      const Users = await UsersPromise;

      await Users.create({ email, password: hash });

      res.redirect("/log-in");
    } catch (err) {
      console.log(err);

      req.flash(
        "error",
        err.errors.map(error => error.message)
      );

      return res.render("sign-up.view.pug", {
        pageTitle: "Sign Up",
        messages: req.flash(),
        //Esto tiene que tener el mismo nombre que res.locals
        email,
        password
      });
    }
  });
};

exports.logIn = (req, res) =>
  res.render("log-in.view.pug", { pageTitle: "Log in" });
