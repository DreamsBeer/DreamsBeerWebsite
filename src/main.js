import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, bottle;
let angle = 0;

init();
animate();

function init() {
  scene = new THREE.Scene();

  // Skybox
  const skybox = new THREE.CubeTextureLoader().load([
    'assets/skybox/px.png', 'assets/skybox/nx.png',
    'assets/skybox/py.png', 'assets/skybox/ny.png',
    'assets/skybox/pz.png', 'assets/skybox/nz.png'
  ]);
  skybox.encoding = THREE.sRGBEncoding;
  scene.background = skybox;
  scene.environment = skybox;

  // Cámara
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight * 0.7), 0.1, 100);
  camera.position.set(0, 1.5, 5);

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight * 0.7);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  document.getElementById('three-container').appendChild(renderer.domElement);

  // Luces
  scene.add(new THREE.AmbientLight(0xffffff, 3));
  const dirLight = new THREE.DirectionalLight(0xffffff, 5);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  // Cargar modelo GLB
  const loader = new GLTFLoader();
  loader.load('assets/models/DreamsBeerBotle.glb', (gltf) => {
    bottle = gltf.scene;
    bottle.scale.set(1, 1, 1);
    scene.add(bottle);
  });

  // Responsive
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / (window.innerHeight * 0.7);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.7);
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Rotar cámara alrededor del eje Y
  angle += 0.002;
  const radius = 5;
  camera.position.x = Math.sin(angle) * radius;
  camera.position.z = Math.cos(angle) * radius;
  camera.lookAt(0, 2.2, 0);

  renderer.render(scene, camera);
}