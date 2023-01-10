import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
let dragging = false;
let mousePrev = [];

export default function Raycasting(camera, scene, callback) {
  window.addEventListener("mousedown", (event) => {
    dragging = false;
  });

  window.addEventListener("mousemove", (event) => {
    if (event.clientX !== mousePrev[0] && event.clientY !== mousePrev[1]) {
      dragging = true;
      mousePrev = [event.clientX, event.clientY];
    }
  });
  
  window.addEventListener("mouseup", (event) => {
    if (dragging) {
      return;
    }

    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(clickMouse, camera);
    let found = raycaster.intersectObjects(scene.children, true);
    console.log(found[0]?.object.parent)
    callback(found[0]?.object.parent, event);
  });
}