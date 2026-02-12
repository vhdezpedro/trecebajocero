const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", async (req, res) => {
  try {
    const clienteId = req.params.id;

    const [rows] = await db.query(
      "SELECT COUNT(*) AS total FROM visitas WHERE cliente_id = ?",
      [clienteId],
    );

    const totalVisitas = rows[0].total || 0;

    let siguientePremio;
    if (totalVisitas < 5) siguientePremio = "Helado";
    else if (totalVisitas < 10) siguientePremio = "Helado";
    else if (totalVisitas < 15) siguientePremio = "Helado";
    else if (totalVisitas < 20) siguientePremio = "Vaso";

    res.json({
      totalVisitas,
      siguientePremio,
      faltan: siguientePremio === "Vaso" ? 20 - total : 5 - (totalVisitas % 5),
      meta: 20,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
});

/* router.post("/visita", async (req, res) => {
  try {
    await db.query("");
  } catch (error) {}
}); */

module.exports = router;
