// Inicjalizacja sceny Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "fixed";  // Ustawienie na stałe w tle
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1"; // Warstwa tła
document.body.appendChild(renderer.domElement);

// Kamera - zmienione ustawienie
camera.position.set(0, 20, 40);  // Wyżej i dalej
camera.lookAt(0, 0, 0);  // Patrzenie na środek układu

// Światło - Słońce jako źródło światła
const light = new THREE.PointLight(0xffffff, 2, 200);
light.position.set(0, 0, 0); 
scene.add(light);

// Ładowanie tekstur planet
const textureLoader = new THREE.TextureLoader();
const planetTextures = {
    sun: textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/sun.jpg"),
    mercury: textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mercury.jpg"),
    venus: textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/venus.jpg"),
    earth: textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmosphere.jpg"),
    mars: textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars.jpg"),
};

// Tworzenie planet z teksturami
const planets = [];
const planetData = [
    { name: "sun", size: 5, distance: 0, texture: planetTextures.sun },
    { name: "mercury", size: 1, distance: 7, texture: planetTextures.mercury },
    { name: "venus", size: 1.5, distance: 12, texture: planetTextures.venus },
    { name: "earth", size: 2, distance: 18, texture: planetTextures.earth },
    { name: "mars", size: 1.3, distance: 24, texture: planetTextures.mars },
];

// Dodawanie planet do sceny
planetData.forEach((data) => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: data.texture });
    const planet = new THREE.Mesh(geometry, material);
    
    planet.position.x = data.distance;
    scene.add(planet);
    planets.push({ mesh: planet, distance: data.distance, speed: Math.random() * 0.02 + 0.005 });
});

// Animacja planet - ruch po orbitach
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
