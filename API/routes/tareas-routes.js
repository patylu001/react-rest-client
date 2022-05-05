
const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareas-controller");

router.post("/",tareaController.createTarea);
router.put("/:id",tareaController.updateTarea);
router.get("/",tareaController.findAllTareas);

module.exports = router;