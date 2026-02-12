const params = new URLSearchParams(window.location.search);
const status = params.get("status");

const statusMensaje = document.querySelector(".js-mensaje-status");

if (status) {
  statusMensaje.classList.add(
    "mt-4",
    "p-3",
    "font-semibold",
    "text-sm",
    "rounded-xl",
    "text-center",
  );

  if (status === "ok") {
    statusMensaje.classList.add("bg-black", "text-green-500");
    statusMensaje.innerHTML =
      "🍦 ¡Visita registrada! Sigue acumulando para tu helado gratis.";
  }

  // Revisar esta linea para ver porque no me jala...

  if (status === "limite") {
    statusMensaje.classList.add(
      "bg-gray-900",
      "text-yellow-200",
      "border",
      "border-gray-700",
      "border-dashed",
    );
    statusMensaje.innerHTML =
      "⏳ Ya registraste tus 2 visitas de hoy. ¡Vuelve mañana!";
  }

  if (status === "error") {
    statusMensaje.classList.add("bg-gray-800", "text-red-300");
    statusMensaje.innerHTML = "⚠️ Ocurrió un problema. Intenta nuevamente.";
  }
}

setTimeout(() => {
  window.history.replaceState({}, document.title, window.location.pathname);
}, 4000);
