const { v4: uuidv4 } = require("uuid");
const logController = require("./logsController");
const { db } = require("../driver");

exports.create = async (req, res) => {
  const {
    name,
    maternalSurname,
    paternalSurname,
    socialSecurityNumber,
    accesible,
  } = req.body;

  try {
    const id = uuidv4();
    await db.collection("patients").doc(id).set({
      id,
      name,
      maternalSurname,
      paternalSurname,
      socialSecurityNumber,
      accesible,
    });
    logController.create("POST /patients");
    return res.status(204).send({ message: "User created successfully." });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await db.collection("patients").get();
    const list = [];
    result.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      list.push(data);
    });
    logController.create("GET /patients");
    res.status(201).send(list);
  } catch (error) {
    res.status(500).send({
      message: "Error at getAll endpoint",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await db.collection("patients").doc(req.params.id).get();
    const data = result.data();
    if (data.accesible) {
      logController.create("GET /patients/:id");
      return res.status(200).send(data);
    } else {
      return res.status(403).send({
        message: "No se puede acceder al paciente",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const {
      id,
      name,
      maternalSurname,
      paternalSurname,
      socialSecurityNumber,
      accesible,
    } = req.body;
    const document = db.collection("patients").doc(id);
    await document.update({
      name,
      maternalSurname,
      paternalSurname,
      socialSecurityNumber,
      accesible,
    });
    return res.status(200).send({ status: "Succes", msg: "Patient updated" });
  } catch (err) {
    return res.status(500).send({ status: "Error", msg: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const document = db.collection("patients").doc(req.params.id);
    await document.delete();
    logController.create("DELETE /patients");
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json(error);
  }
};
