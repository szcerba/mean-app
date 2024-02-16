const { Router } = require("express");
const { check } = require("express-validator");
const {
  loginUsuario,
  registerUsuario,
} = require("../controllers/authController");
const validationErrors = require("../middlewares/ValidationErrors");

const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("email", "El formato es inválido").isEmail(),
    check("username", "El nombre de usuario es requerido").not().isEmpty(),
    check(
      "password",
      "La contraseña tiene que ser de 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
    validationErrors,
  ],
  registerUsuario
);
authRouter.post(
  "/login",
  [
    check("email", "El formato es inválido").isEmail(),
    check(
      "password",
      "La contraseña tiene que ser de 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
    validationErrors,
  ],
  loginUsuario
);

module.exports = authRouter;
