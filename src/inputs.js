import Raycasting from "./raycaster.js";

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
      const rotation = {
        x: +this.rotation.xAxis.value * Math.PI / 180,
        y: +this.rotation.yAxis.value * Math.PI / 180,
        z: +this.rotation.zAxis.value * Math.PI / 180,
      };
      if (this.selected) {
        this.selected.rotation.x = rotation.x;
        this.selected.rotation.y = rotation.y;
        this.selected.rotation.z = rotation.z;
        // this.updatePosition(rotation);
      }
      this.emit("updated", this.selected);
    });
  }
  updatePosition(rotation) {
    this.selected.children.forEach((child) => {
      child.rotation.x = rotation.x;
      child.rotation.y = rotation.y;
      child.rotation.z = rotation.z;
    });
  }
  deselect() {
    if (this.selected) {
      this.selected.children.forEach((child) => {
        child.material.color.set( 13421772 );
      });
      // this.selected.material.color.set( 13421772 );
    }
    this.selected = null;
  }
  select(intersation) {
    this.selected = intersation;
    this.selected.children.forEach((child) => {
      child.material.color.set( 0xff0000 );
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
