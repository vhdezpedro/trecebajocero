const express = require("express");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

const visitasRoute = require("./routes/visitas");
const progresoRoute = require("./routes/progreso");
const authRoute = require("./routes/auth");
const clientesRoute = require("./routes/clientes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Servidor conectado");
});

app.get("test/tablas", async (req, res) => {
  const [tablas] = await db.query("SHOW TABLES");
  res.json(tablas);
});

app.use(express.static(path.join(__dirname, "..")));

app.use("/visitas", visitasRoute);
app.use("/progreso", progresoRoute);
app.use("/auth", authRoute);
app.use("/clientes", clientesRoute);

app.listen(3000, "0.0.0.0", () => {
  console.log("El servidor esta corriendo en el puerto 3000");
});
