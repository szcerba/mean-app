const bcrytjs = require("bcryptjs");
const usuarioModel = require("../models/usuario");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const registerUsuario = async (req, res) => {

  const { email, password, username } = req.body;

  try {
    let usuario = await usuarioModel.findOne({ email });

    if (usuario) {
      return res.status(501).json({
        ok: false,
        msg: "Correo ya registrado",
      });
    }

    const nuevoUsuario = new usuarioModel({ email, password, username });

    const salt = bcrytjs.genSaltSync(10);
    nuevoUsuario.password = bcrytjs.hashSync(password, salt);

    await nuevoUsuario.save();

    const payload = {
      id: nuevoUsuario.id,
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: nuevoUsuario.id,
          username,
          msg: "Usuario creado",
          token,
        });
      }
    );
  } catch (error) {
    res.json({
      ok: false,
      msg: "Error al registrar",
    });
  }
};

const loginUsuario = async (req, res) => {

  const { email, password } = req.body;

  try {
    let usuario = await usuarioModel.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Correo o contraseña inválida",
      });
    }

    const passwordValido = bcrytjs.compareSync(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({
        ok: false,
        msg: "Correo o contraseña inválida",
      });
    }

    const payload = {
      id: usuario.id,
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        return res.json({
          ok: true,
          id: usuario.id,
          username: usuario.username,
          msg: "Inició sesión",
          token,
        });
      }
    );
  } catch (error) {
    res.json({
      ok: false,
      msg: "Error al iniciar sesión",
    });
  }
};

module.exports = {
  loginUsuario,
  registerUsuario,
};
