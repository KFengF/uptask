const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const router = require("./routes/router");
const dbPromise = require("./config/db.config");
require("./models/Projects.model");
const utils = require("./utils");

dbPromise.then(db => db.sync());

var app = express();

app.use(express.static("public"));
// para indicar de donde se sacara los archivos estaticos

app.set("view engine", "pug");
// set es como una configuracion, el primer argumento es una palabra
// reservada y el segundo su valor

app.set("views", path.join(__dirname, "./views"));
// path.join une dos rutas, __dirname es una palabra reservada de node
// que retorna el path de la carpeta actual, el segundo arg es una
// ruta relativa

app.use((req, res, next) => {
  res.locals.vardump = utils.vardump; //poniendo variables en el view
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router());
// use significa que es un middleware y que se llama la funcion en
// cada http request

app.listen(process.env.PORT, function() {
  console.log("app running in port " + process.env.PORT);
});
