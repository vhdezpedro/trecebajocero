import { cargarProceso } from "./app.js";

export async function login(API) {
  const telefono = document.getElementById("telefono").value;

  if (!telefono) {
    return console.log("Coloca un número de teléfono");
  }

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ telefono }),
  });

  const data = await res.json();

  localStorage.setItem("cliente_id", data.id);

  if (data.nuevo) {
    mostrarRegistro();
  } else {
    cargarProceso(data.id);
    console.log(`Bienvenido ${data.nombre}`);
  }
}

export async function completarRegistro(API) {
  const cliente_id = localStorage.getItem("cliente_id");

  const nombre = document.getElementById("nombre").value;
  const fecha_nacimiento = document.getElementById("fechaNacimiento").value;

  if (!nombre || !fecha_nacimiento) {
    console.log("Completa los datos");
    return;
  }

  const res = await fetch(`${API}/clientes/${cliente_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      fecha_nacimiento,
    }),
  });

  const data = await res.json();
  console.log(data);

  cargarProceso(cliente_id);
}

function mostrarRegistro() {
  document.getElementById("login").style.display = "none";
  document.getElementById("registro").style.display = "block";
}
