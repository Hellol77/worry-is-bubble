import { $ } from "../utils/querySelector";

export default class MenuController {
  constructor() {}

  init() {
    const menuImg = $("#menu_svg");

    menuImg.addEventListener("click", () => {
      const menuContent = $("#menu_content");
      menuContent.classList.toggle("show_menu");

      const menuImg = $("#menu_svg_path");
      menuImg.classList.toggle("change_menu_svg_color");
    });
  }
}
