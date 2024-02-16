const { Router } = require("express");
const {
  createTarea,
  readTarea,
  updateTarea,
  deleteTarea,
} = require("../controllers/tareaController");
const verifyToken = require("../middlewares/VerifyToken");
const validationErrors = require("../middlewares/ValidationErrors");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/create",
  [
    check("nombre", "Nombre del proyecto obligatorio").not().isEmpty(),
    validationErrors,
    verifyToken,
  ],
  createTarea
);
router.get("/read", [verifyToken], readTarea);
router.put(
  "/update/:id",
  [
    check("nombre", "Nombre del proyecto obligatorio").not().isEmpty(),
    validationErrors,
    verifyToken,
  ],
  updateTarea
);
router.delete("/delete/:id", [verifyToken], deleteTarea);

module.exports = router;
