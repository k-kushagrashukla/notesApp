const swaggerJsdoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "Notes backend API"
    },

    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },

  apis: []
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};