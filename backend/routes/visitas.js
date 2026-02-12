const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { cliente_id } = req.body;

  console.log(cliente_id);
  
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) as total FROM visitas WHERE cliente_id = ? AND DATE(fecha_visita) = CURDATE()",
      [cliente_id],
    );

    /*     if (rows[0].total >= 2) {
      return res.json({
        success: false,
        mensaje: "⚠️ Límite diario alcanzado. Ya registraste dos visitas hoy.",
      });
    } */

    await db.query("INSERT INTO visitas (cliente_id) VALUES (?)", [cliente_id]);
    res.json({
      success: true,
      mensaje: "✅ Visita registrada correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al registrar la visita" });
  }
});

/* router.get("/", async (req, res) => {
  try {
    const clienteId = 1;
    const hoy = new Date().toISOString().split("T")[0];

    const [visitasHoy] = await db.query(
      "SELECT COUNT(*) AS total FROM visitas WHERE cliente_id = ? AND fecha = ?",
      [clienteId, hoy],
    );

    if (visitasHoy[0] >= 2) {
      return res.redirect("/index.html?status=limite");
    }

    const hora = new Date().toTimeString().split(" ")[0];

    await db.query(
      "INSERT INTO visitas (cliente_id, fecha, hora) VALUES (?,?,?)",
      [clienteId, hoy, hora],
    );

    return res.redirect("/index.html?status=ok");
  } catch (error) {
    console.log(error);
    return res.redirect("/index.html?status=error");
  }
}); */

module.exports = router;
