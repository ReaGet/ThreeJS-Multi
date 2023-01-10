import * as THREE from "three";

import {
  OrbitControls
} from "three/addons/OrbitControls.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { debounce } from "./utils.js";
import InputUI from "./inputs.js";

let cameraPersp, currentCamera;
let scene, renderer, orbit;
let loader = null;
let inputUI = null;
let updateDataDebounced = null;

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
  
  updateDataDebounced = debounce(updateData, 200);
  inputUI = new InputUI(scene, currentCamera);

  loader = new GLTFLoader();
  await getModelsData((data) => {
    data.map(loadModel);
  });

  inputUI.on("updated", updateDataDebounced);

  inputUI.on("render", render);

  window.addEventListener("resize", onWindowResize);
}

async function updateData(object) {
  console.log(object)
  const data = {
    objectId: object.userData.id,
    x: object.rotation.x,
    y: object.rotation.y,
    z: object.rotation.z,
  }
  const serialized = new URLSearchParams(data).toString();
  try {
    await fetch(`./php/request.php?${serialized}`);
  } catch (err) {
    console.error("Cannot update object: ", err);
  }
}

async function getModelsData(callback) {
  try {  
    await fetch("./php/request.php?get=1")
    .then(response => response.json())
    .then(callback);
  } catch(err) {
    console.error("Cannot get objects: ", err);
  }
}

function loadModel({ id, url, location, rotation }) {
  loader.load(`.${url}`, function (object) {
    location = JSON.parse(location);
    rotation = JSON.parse(rotation);
    let model = object.scene;
    model.position.set(location.x, location.y, location.z);
    model.rotation.set(rotation.x, rotation.y, rotation.z);
    model.userData.id = id;
    console.log(model)
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