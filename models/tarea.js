const { Schema, model } = require("mongoose");

const tarea = new Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("tarea", tarea);
