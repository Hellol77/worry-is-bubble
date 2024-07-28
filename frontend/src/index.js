import CanvasController from "./controller/canvasController";
import InputController from "./controller/inputController";
import Input from "./components/input";
import Menu from "./components/menu";
import MenuController from "./controller/menuController";

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
