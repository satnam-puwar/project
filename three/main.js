import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaec6cf);

// const camera = new THREE.OrthographicCamera(
//     -frustumSize * aspect, // left
//     frustumSize * aspect, // right
//     frustumSize, // top
//     -frustumSize, // bottom
//     0.1, // near
//     100 // far
// );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.9, 2000    );
camera.position.set(3, 3,10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight("#ffffff",1);
light.position.set(5, 5, 5);
scene.add(light);

const house = new THREE.Group();
scene.add(house);

const wallGeometry = new THREE.BoxGeometry(4, 3, 4);
const wallMaterial = new THREE.MeshStandardMaterial({ color: "#8B4513" }); 
const walls = new THREE.Mesh(wallGeometry, wallMaterial);
walls.position.y = 1.5;
house.add(walls);

const roofGeometry = new THREE.ConeGeometry(3.2, 2, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: "#ff6347" });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 3.5;
roof.rotation.y = Math.PI / 4; 
house.add(roof);

const doorGeometry = new THREE.BoxGeometry(1, 1.5, 0.01);
const doorMaterial = new THREE.MeshStandardMaterial({ color: "#654321" });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 0.79, 2.01);
house.add(door);

const windowGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.01);
const windowMaterial = new THREE.MeshStandardMaterial({ color: "#ADD8E6", transparent: true, opacity: 0.7 });

const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
leftWindow.position.set(-1.2, 1.5, 2.01);
house.add(leftWindow);

const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
rightWindow.position.set(1.3, 1.5, 2.01);
house.add(rightWindow);



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

renderer.setAnimationLoop(animate);
