// Inicjalizacja sceny Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Przezroczyste tło
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Światło
const light = new THREE.PointLight(0xffffff, 1.5, 100);
light.position.set(0, 0, 0); // Słońce jako źródło światła
scene.add(light);

// Tworzenie planet
const planets = [];
const planetData = [
    { size: 2, distance: 0, color: 0xffcc00 }, // Słońce
    { size: 0.5, distance: 5, color: 0xaaaaaa }, // Merkury
    { size: 0.8, distance: 8, color: 0xff5500 }, // Wenus
    { size: 1, distance: 12, color: 0x0000ff }, // Ziemia
    { size: 0.7, distance: 16, color: 0xff0000 }, // Mars
];

// Dodajemy planety do sceny
planetData.forEach((data) => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const planet = new THREE.Mesh(geometry, material);
    
    planet.position.x = data.distance;
    scene.add(planet);
    planets.push({ mesh: planet, distance: data.distance, speed: Math.random() * 0.02 + 0.005 });
});

camera.position.z = 30;

// Animacja planet
function animate() {
    requestAnimationFrame(animate);
    
    planets.forEach((planet, index) => {
        if (index !== 0) { // Pomijamy Słońce
            planet.mesh.position.x = Math.cos(Date.now() * planet.speed * 0.001) * planet.distance;
            planet.mesh.position.z = Math.sin(Date.now() * planet.speed * 0.001) * planet.distance;
        }
    });

    renderer.render(scene, camera);
}

animate();

// Dopasowanie do rozmiaru ekranu
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
