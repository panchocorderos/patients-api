const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes");

app.use("/", apiRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

exports.app = functions.https.onRequest(app);
