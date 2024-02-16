const { validationResult } = require("express-validator");

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(501).json({
      ok: false,
      msg: errors.mapped(),
    });
  }

  next();
};

module.exports = validationErrors;
