const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const noteRoutes = require("./routes/noteRoutes");

const {
  swaggerUi,
  specs
} = require("./swagger/swagger");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/", authRoutes);

app.use("/notes", noteRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.get("/openapi.json", (req, res) => {
  res.json(specs);
});

app.get("/about", (req, res) => {
  res.json({
    name: "Kushagra Shukla",
    email: "your-email@gmail.com",

    my_features: {
      version_history:
        "Tracks previous versions of notes before updates.",

      search:
        "Supports full text note search using MongoDB indexing.",

      pagination:
        "Supports scalable note fetching with page and limit query parameters."
    }
  });
});

module.exports = app;