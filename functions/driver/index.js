const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  databaseURL: `${process.env.DATABASEURL}`,
});

const db = admin.firestore();

module.exports = {
  db,
};
