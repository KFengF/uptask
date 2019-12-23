const Projects = require("../models/Projects.model");

exports.home = (req, res) => {
  res.render("layout.view.pug", { pageTitle: "Projects" });
  //Indica que pagina renderizar, y sus variables
};

exports.new = (req, res) => {
  res.render("new.view.pug", { pageTitle: "New Project" });
};

exports.newPost = (req, res) => {
  const { name } = req.body;
  const errors = [];

  if (!name) errors.push({ text: "Enter a name please" });

  if (errors.length > 0) {
    res.render("new.view.pug", { pageTitle: "New Project", errors });
  } else {
    Projects.then(Projects => Projects.create({ name })).catch(console.error);

    res.redirect("/");
  }
};
