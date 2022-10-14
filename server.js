const path = require("path");
const express = require("express");
const session = require("express-session");
const apiRoutes = require("./routes/api.routes");
const clientRoutes = require("./routes/client.routes");
const sessionMiddleware = require("./middleware/session.middleware");

const server = express();

const PORT = process.env.PORT || 3032;

server
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(session({
    secret: "test test test",
    resave: false,
    saveUninitialized: true,
  }))

  // Configuration du moteur de template
  .set("views", path.join(__dirname, "views/pages"))
  .set("view engine", "ejs")

  // Configuration du serveur de fichiers statiques
  .use("/medias/avatars", express.static("files/images/avatars"))
  .use("/js", express.static("files/js"))
  .use("/style", express.static("files/style"))

  // Configuration de la response not found 404
  .get("/404", (req, res) => {
    res.status(404).sendFile(path.resolve("views/static/404.html"));
  })

  // Configuration de la page not auth
  .get("/not-auth", (req, res) => {
    res.status(200).sendFile(path.resolve("views/static/not-auth.html"));
  })

  // Chargement de routes pour les API
  .use("/api", apiRoutes)

  // Chargement de routes pour la partie cliente
  .use("/client", sessionMiddleware, clientRoutes)

  // Gestion des routes non enregistrées
  .use("/*", (req, res) => {
    res.redirect("/404");
  });

// Demarrage du serveur
require("http")
  .createServer(server)
  .listen(PORT, function () {
    console.log(
      `Server started on port ${PORT}. Use http://localhost:${PORT} to access it.`
    );
  });
