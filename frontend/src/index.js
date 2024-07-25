import CanvasController from "./controller/canvasController";
import socket from "./apis/socket";
const canvasController = new CanvasController();
socket();
canvasController.init();
