const { db } = require("../driver");


exports.create = async (endpoint) => {
  const unixTimestamp = new Date().getTime() / 1000;
  await db.collection("logs").doc().set({
    created_at: unixTimestamp,
    message: endpoint,
  });
};
