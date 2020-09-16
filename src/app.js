const express = require("express");
const path = require("path"); // core module
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/* console.log(__dirname);
console.log(path.join(__dirname, "../public")); */

const app = express();

// Defines path for express config
const rootPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../public/templates/views"); // use template foler instead of views
const partialsPath = path.join(__dirname, "../public/templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs"); // For handlebar setup
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directories to serve
app.use(express.static(rootPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Swapnajit" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        // Runs if everything went well
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Title",
    aboutText: "This is about page",
    name: "swapnajit",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Text title",
    helpText: "Help Title",
    name: "swapnajit",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Searched help page not found",
    name: "Swapnajit",
  });
});

// error page, should be at last
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 View",
    errorMessage: "Page not found",
    name: "Swapnajit",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.....");
});
