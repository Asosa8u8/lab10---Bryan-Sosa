let tracking = false;
let gazeData = [];

document.addEventListener("DOMContentLoaded", function () {
  // Verifica si la librería heatmap.js está disponible
  if (typeof h337 === "undefined") {
    console.error("❌ La librería Heatmap.js no se cargó.");
    return;
  }

  const heatmap = h337.create({
    container: document.getElementById("heatmapContainer"),
    radius: 40,
    maxOpacity: 0.6,
    minOpacity: 0.1,
    blur: 0.9
  });

  const button = document.getElementById("toggleTrackingBtn");

  button.addEventListener("click", function () {
    tracking = !tracking;
    console.log("🔁 Seguimiento:", tracking);

    if (tracking) {
      gazeData = [];

      webgazer.setGazeListener((data, timestamp) => {
        if (data) {
          console.log("👁 Mirada capturada:", data);
          gazeData.push({
            x: Math.floor(data.x),
            y: Math.floor(data.y),
            value: 1
          });
        }
      }).begin();

      button.textContent = "Detener y Mostrar Mapa de Calor";
    } else {
      webgazer.clearGazeListener();
      webgazer.pause();

      heatmap.setData({
        max: 10,
        data: gazeData
      });

      button.textContent = "Iniciar Seguimiento Visual";
    }
  });
});