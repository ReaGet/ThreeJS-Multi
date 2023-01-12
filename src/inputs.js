import Raycasting from "./raycaster.js";
import * as THREE from "three";

const template = `
  <div class="ui-wrapper">
    <div class="ui-coords">
      <label class="ui-coords__item" for="xAxis">
        <div class="ui-coords__item-img"></div>
        <input class="ui-coords__item-input" type="number" value="0" id="xAxis">
      </label>
      <label class="ui-coords__item" for="yAxis">
        <div class="ui-coords__item-img"></div>
        <input class="ui-coords__item-input" type="number" value="0" id="yAxis">
      </label>
      <label class="ui-coords__item" for="zAxis">
        <div class="ui-coords__item-img"></div>
        <input class="ui-coords__item-input" type="number" value="0" id="zAxis">
      </label>
    </div>
  </div>
`;

export default class InputUI {
  constructor(scene, camera) {
    this.listeners = {};
    this.selected = null;
    document.body.insertAdjacentHTML("beforeend", template);
    this.rotation = {
      parent: document.querySelector(".ui-wrapper"),
      xAxis: document.querySelector(".ui-coords #xAxis"),
      yAxis: document.querySelector(".ui-coords #yAxis"),
      zAxis: document.querySelector(".ui-coords #zAxis"),
    };
    this.bind();

    Raycasting(camera, scene, (intersation, event) => {
      if (intersation) {
        this.deselect();
        this.select(intersation);
        this.show();
        this.set(this.selected.rotation);
      } else if (!event.target.closest(".ui-wrapper")) {
        this.deselect();
        this.hide();
      }
      this.emit("render");
    });
  }
  bind() {
    document.addEventListener("input", (event) => {
      if (event.target.tagName !== "INPUT") {
        return;
      }
      this.rotation.xAxis.value = this.handleValue(+this.rotation.xAxis.value);
      this.rotation.yAxis.value = this.handleValue(+this.rotation.yAxis.value);
      this.rotation.zAxis.value = this.handleValue(+this.rotation.zAxis.value);
      if (this.selected) {
        this.selected.rotation.x = this.rotation.xAxis.value * Math.PI / 180;
        this.selected.rotation.y = this.rotation.yAxis.value * Math.PI / 180;
        this.selected.rotation.z = this.rotation.zAxis.value * Math.PI / 180;
      }
      this.emit("updated", this.selected);
    });
  }
  deselect() {
    if (this.selected) {
      this.selected.traverse((child) => {
        if (child instanceof THREE.Object3D) {
          if(child.material !== undefined) {
            child.material.color.set( 13421772 );
          }
        }
      });
    }
    this.selected = null;
  }
  select(intersation) {
    this.selected = intersation;
    this.selected.traverse((child) => {
      if (child instanceof THREE.Object3D) {
        if(child.material !== undefined) {
          child.material.color.set( 0xff0000 );
        }
      }
    });
  }
  show() {
    this.rotation.parent.classList.add("visible");
  }
  hide() {
    this.rotation.parent.classList.remove("visible");
  }
  set(rotation) {
    this.rotation.xAxis.value = rotation.x * 180 / Math.PI;
    this.rotation.yAxis.value = rotation.y * 180 / Math.PI;
    this.rotation.zAxis.value = rotation.z * 180 / Math.PI;
  }
  handleValue(value) {
    return (360 + (value % 360)) % 360;
  }
  on(listener, fn) {
    if (!this.listeners[listener]) {
      this.listeners[listener] = [];
    }
    this.listeners[listener].push(fn);
  }
  off(listener) {    
    if (!this.listeners[listener]) {
      return;
    }
    delete this.listeners[listener];
  }
  emit(listener) {
    if (!this.listeners[listener]) {
      return;
    }
    this.listeners[listener].forEach((fn) => {
      fn.call(null, ...[...arguments].slice(1));
    });
  }
}
