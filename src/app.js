const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const router = require("./routes/router");
const dbPromise = require("./config/db.config");
const passport = require("./config/passport.config");
const utils = require("./utils");
const authController = require("./controllers/auth.controller");

dbPromise.then(db => db.sync());

const app = express();

app.use("/public", express.static(path.join(__dirname, "../public")));
// para indicar de donde se sacara los archivos estaticos

app.use(
  "/static",
  express.static(
    path.join(
      __dirname,
      "../node_modules/@fortawesome/fontawesome-free/"
    )
  )
);
// para indicar de donde se sacara los archivos estaticos

app.set("view engine", "pug");
// set es como una configuracion, el primer argumento es una palabra
// reservada y el segundo su valor

app.set("views", path.join(__dirname, "./views"));
// path.join une dos rutas, __dirname es una palabra reservada de node
// que retorna el path de la carpeta actual, el segundo arg es una
// ruta relativa

app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
//flash es para mostrar mensajes

app.use(cookieParser());

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.vardump = utils.vardump; //poniendo variables en el view
  res.locals.messages = req.flash();
  next();
});

app.use(authController.isAuthenticated);
//middleware para que todos los req se verifique si esta autenticado

app.use("/", router());
// use significa que es un middleware y que se llama la funcion en
// cada http request

// Handle 404
app.use((req, res) => {
  res.status(400);
  res.render("not-found.view.pug", { title: "404: File Not Found" });
});

// Handle 500
app.use((error, req, res) => {
  res.status(500);
  res.render("server-error.view.pug", {
    title: "500: Internal Server Error",
    error: error
  });
});

app.listen(process.env.PORT, () =>
  console.log("app running in port " + process.env.PORT)
);
