import CanvasController from "./controller/canvasController";
import InputController from "./controller/inputController";
import Input from "./components/input";
import Menu from "./components/menu/menu";
import MenuController from "./controller/menuController";

window.onload = function () {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    })
    .catch((e) => {
      console.error(`Audio permissions denied: ${e}`);
    });
};

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.render();
    this.init();
  }

  init() {
    const canvasController = new CanvasController();
    const inputController = new InputController();
    const menuController = new MenuController();
    canvasController.init();
    inputController.init();
    menuController.init();
  }

  render() {
    const input = new Input();
    const menu = new Menu();
    this.body.appendChild(menu.render());
    this.body.appendChild(input.render());
  }
}

new App();
