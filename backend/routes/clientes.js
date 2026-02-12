const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/:id", async (req, res) => {
  const { nombre, fecha_nacimiento } = req.body;

  if (!nombre || !fecha_nacimiento) {
    return res.status(400).json({ error: "Faltan datos." });
  }

  await db.query(
    "UPDATE clientes SET nombre = ?, fecha_nacimiento = ? WHERE id = ?",
    [nombre, fecha_nacimiento, req.params.id],
  );

  res.json({ success: true });
});

router.get("/:id", async (req, res) => {
  const cliente_id = req.params.id;

  const [rows] = await db.query(
    "SELECT id, nombre FROM clientes WHERE id = ?",
    [cliente_id],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  res.json(rows[0]);
});

module.exports = router;
