const { Router } = require("express");

const apiRoutes = new Router();
const patientRoutes = require("./patientRoutes");

apiRoutes.use("/patients", patientRoutes);


module.exports = apiRoutes;
