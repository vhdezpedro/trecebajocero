import { login, completarRegistro } from "./login.js";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "http://192.168.1.65:3000";

window.onload = async () => {
  const cliente_id = localStorage.getItem("cliente_id");
  const params = new URLSearchParams(window.location.search);
  const modo = params.get("modo");

  if (cliente_id) {
    cargarProceso(cliente_id);
  }

  if (modo === "visita") {
    await cargarVisita(cliente_id);
    window.history.replaceState({}, document.title, "/");
  }
};

document.querySelector(".btnLogin").addEventListener("click", () => {
  login(API);
});
document.querySelector(".btnRegistro").addEventListener("click", () => {
  completarRegistro(API);
});

export async function cargarProceso(cliente_id) {
  document.getElementById("login").style.display = "none";
  document.getElementById("registro").style.display = "none";
  document.getElementById("app").style.display = "block";

  const nombreCliente = document.querySelector(".js-nombre");
  const visitas = document.querySelector(".js-visitas");
  const numeroVisitas = document.querySelector(".js-numero-visitas");
  const mensajeVisitas = document.querySelector(".js-mensaje-visitas");

  const resCliente = await fetch(`${API}/clientes/${cliente_id}`);
  const cliente = await resCliente.json();
  nombreCliente.innerHTML = `👤 ${cliente.nombre}`;

  const resProgreso = await fetch(`${API}/progreso/${cliente_id}`);
  const progreso = await resProgreso.json();

  let cardHTML = "";
  for (let i = 0; i < 20; i++) {
    i < progreso.totalVisitas
      ? (cardHTML += '<span class"text-gray-700">🍦</span>')
      : (cardHTML += '<span class"text-gray-700">⬜</span>');
  }

  visitas.innerHTML = cardHTML;
  numeroVisitas.innerHTML = `${progreso.totalVisitas} / ${progreso.meta} visitas`;
  mensajeVisitas.innerHTML = `Te faltan ${progreso.faltan} visitas para tu ${progreso.siguientePremio} gratis`;
}

async function cargarVisita(cliente_id) {
  const registroVisitas = document.querySelector(".js-registro-visitas");

  console.log("click");
  const res = await fetch(`${API}/visitas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente_id }),
  });

  const data = await res.json();
  console.log(data);

  if (data.success) {
    registroVisitas.classList.add("text-green-500");
    registroVisitas.classList.remove("text-yellow-200");
    cargarProceso(cliente_id);
  } else {
    registroVisitas.classList.add("text-yellow-200");
    registroVisitas.classList.remove("text-green-500");
    cargarProceso(cliente_id);
  }

  registroVisitas.innerHTML = data.mensaje;
}
