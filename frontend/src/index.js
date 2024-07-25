import CanvasController from "./controller/canvasController";
import InputController from "./controller/inputController";

const canvasController = new CanvasController();
const inputController = new InputController();
// socket();

canvasController.init();
inputController.init();
