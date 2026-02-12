const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", async (req, res) => {
  const { telefono } = req.body;

  const [rows] = await db.query("SELECT * FROM clientes WHERE telefono = ?", [
    telefono,
  ]);

  if (rows.length > 0) {
    return res.json({
      id: rows[0].id,
      nombre: rows[0].nombre,
      nuevo: false,
    });
  }

  const [result] = await db.query(
    "INSERT INTO clientes (nombre, telefono) VALUES (?, ?)",
    ["Cliente", telefono],
  );

  res.json({
    id: result.insertId,
    nombre: "Cliente",
    telefono,
    nuevo: true,
  });
});

module.exports = router;
