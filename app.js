//Variables for setup
// import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";


let container;
let camera;
let renderer;
let scene;
let house;
let controls;

function init() {
    container = document.querySelector(".scene");

    //Create scene
    scene = new THREE.Scene();

    const fov = 45;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 1;
    const far = 10000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-1, 1, 10);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(40, 80, 30);
    scene.add(light);
    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./room/untitled.gltf", function (gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // camera.position.set(0, 20, 100);
    controls.update();
}
function animate() {
    requestAnimationFrame(animate);
    // controls.update()
    renderer.render(scene, camera);
}
init();
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);