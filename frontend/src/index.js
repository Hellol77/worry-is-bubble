import CanvasController from "./controller/canvasController";
import InputController from "./controller/inputController";
import Input from "./components/input";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.render();
    this.init();
  }

  init() {
    const canvasController = new CanvasController();
    const inputController = new InputController();
    canvasController.init();
    inputController.init();
  }

  render() {
    const input = new Input();
    this.body.appendChild(input.render());
  }
}

new App();
