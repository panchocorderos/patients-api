const { Router } = require("express");

const router = new Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.create);
router.get("/:id", patientController.getById);
router.get("/", patientController.getAll);
router.delete("/:id", patientController.remove);
router.put("/:id", patientController.update);

module.exports = router;
