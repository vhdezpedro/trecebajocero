const db = require("./db");

async function crearTablas() {
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
}

crearTablas();
