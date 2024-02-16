const tarea = require("../models/tarea");

const createTarea = async (req, res) => {
  const { nombre } = req.body;
  const id = req.uid;

  const nuevaTarea = new tarea({ nombre, creator: id });

  await nuevaTarea.save();

  res.status(200).json({
    ok: true,
    msg: "Tarea Creada",
    nuevaTarea,
  });
};

const readTarea = async (req, res) => {
  const id = req.uid;

  try {
    const tareas = await tarea.find({ creator: id }).sort({ createdAt: -1 });
    return res.json({
      ok: true,
      tareas,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Tareas no encontradas",
    });
  }
};

const updateTarea = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const tarea2 = await tarea.findByIdAndUpdate(id, { nombre }, { new: true });

  return res.json({
    ok: true,
    msg: "Tarea actualizada",
    tarea2,
  });

  try {
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Tarea no actualizada",
    });
  }
};

const deleteTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea2 = await tarea.findByIdAndDelete(id);
    return res.json({
      ok: true,
      msg: "Tarea eliminada",
      tarea2,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Tarea no eliminada",
    });
  }
};

module.exports = { createTarea, readTarea, updateTarea, deleteTarea };
