const express = require("express");
const path = require("path");
const db = require("./db");
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

app.get("/crear-tablas", async (req, res) => {
  try {
    db.query(
      `CREATE TABLE IF NOT EXISTS clientes (
      id int auto_increment primary key,
      nombre varchar(100) not null,
      telefono varchar(15),
      fecha_nacimiento date,
      creado_en timestamp default current_timestamp
      )`,
    );

    db.query(
      `CREATE TABLE IF NOT EXISTS visitas (
      id int auto_increment primary key,
      cliente_id int not null,
      fecha_visita date not null,
      creado_en timestamp default current_timestamp,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      )`,
    );

    console.log("Las tablas se crearon correctamente");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

app.get("/test-tablas", async (req, res) => {
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
