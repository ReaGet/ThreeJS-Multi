import * as THREE from "three";

import {
  OrbitControls
} from "three/addons/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let cameraPersp, currentCamera;
let scene, renderer, orbit;
let loader = null;

init();
// render();

async function init() {
  const pixelRatio = window.devicePixelRatio;
  const aspect = window.innerWidth / window.innerHeight;

  cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
  currentCamera = cameraPersp;

  currentCamera.position.set(1000, 500, 1000);
  currentCamera.lookAt(0, 200, 0);

  scene = new THREE.Scene();
  scene.add(new THREE.GridHelper(1000, 10, 0x888888, 0x444444));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(1, 1, 1);
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  orbit = new OrbitControls(currentCamera, renderer.domElement);
  orbit.enableDamping = true;
  orbit.update();

  loader = new GLTFLoader();
  await getModelsData((data) => {
    data.map(loadModel);
    console.log(data);
  });
  // let car = null;
  
  // loader.load(`./assets/car2/source/car.glb`, function (object) {
  //   car = object.scene;
  //   car.scale.set(200, 200, 200);
  //   car.position.x = -290;
  //   car.position.y = 0;
  //   car.position.z = -320;

  //   scene.add(car);
  //   // render();
  // }, function (xhr) {
  // }, function (error) {
  //     console.log("error")
  // });

  // orbit.addEventListener("change", render);

  window.addEventListener("resize", onWindowResize);
}

async function getModelsData(callback) {
  await fetch("./php/request.php")
    .then(response => response.json())
    .then(callback);
}

function loadModel({ url, location }) {
  loader.load(`.${url}`, function (object) {
    location = JSON.parse(location);
    let model = object.scene;
    model.position.x = location.x;
    model.position.y = location.y;
    model.position.z = location.z;
    scene.add(model);
  }, function (xhr) {
  }, function (error) {
  });
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  cameraPersp.aspect = aspect;
  cameraPersp.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {  
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.render(scene, currentCamera);
  orbit.update();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, currentCamera);
  render();
}

animate();