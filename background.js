const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 150; // Liczba gwiazd

// Tworzenie gwiazd
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random(),
        speed: Math.random() * 0.5 + 0.2
    });
}

// Animacja gwiazd
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Gwiazdy powoli opadają w dół
        star.y += star.speed;

        // Jeśli gwiazda wyleci poza ekran, pojawia się na górze
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        // Migotanie gwiazd
        star.alpha += (Math.random() - 0.5) * 0.02;
        if (star.alpha < 0.3) star.alpha = 0.3;
        if (star.alpha > 1) star.alpha = 1;
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// Dopasowanie canvas do rozmiaru ekranu
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
