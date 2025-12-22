(function () {
  const canvas = document.getElementById("lightCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawLight();
  }

  function drawLight() {
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(100, 200, w, h);

    // Центр овалу ближче до лівого верхнього кута
    const cx = w * 0.2;
    const cy = h * 0.2;

    // Радіуси для еліпсу
    const radiusX = w * 0.5;
    const radiusY = h * 0.4;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radiusX);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
})();
