import * as THREE from 'three';
import './style.css';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgba(36, 37, 42, 0.15)");


//sphere
const geometry = new THREE.IcosahedronGeometry(5, 2);
const material = new THREE.MeshPhongMaterial({
  color: "rgb(#4158D0, #C850C0, 0)",
  wireframe: true,
  transparent: true,
  side: THREE.DoubleSide
});

const geometry1 = new THREE.IcosahedronGeometry(2, 64, 64);
const material1 = new THREE.MeshPhongMaterial({
  roughness: 1,
  color: "rgb(#000, #fff, 0)",
  side: THREE.DoubleSide
})

const mesh  = new THREE.Mesh(geometry, material);
const mesh1 = new THREE.Mesh(geometry1, material1);
scene.add(mesh);
scene.add(mesh1);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight-10
}

//light
const light = new THREE.HemisphereLight('#fff', '#32527B', '#fff');
scene.add(light);
light.position.set (0, 37, 10);
light.intensity = 1.95;
// scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(50, sizes.width/ sizes.height);
camera.position.z = 20;
scene.add(camera);

//RENDER THE SCENE
 const canvas = document.querySelector('.webgl');
 //create render object 
 const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x000000, 0.0);
renderer.setPixelRatio(4);
renderer.render(scene, camera);

//disable pan | disable zoom | enable damping  // takes CAMERA AND CANVAS
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 8;


//resize
window.addEventListener('resize', ()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight-10;
  //update camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})
const loop = () =>{
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();