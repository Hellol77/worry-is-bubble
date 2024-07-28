export default class Menu {
  constructor() {}

  render() {
    const menuContainer = document.createElement("div");
    menuContainer.id = "menu_container";

    const menuContent = document.createElement("div");
    menuContent.id = "menu_content";

    menuContainer.appendChild(this.svg());
    menuContainer.appendChild(menuContent);

    return menuContainer;
  }

  svg() {
    const svgNamespace = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("class", "svg-icon");

    const path1 = document.createElementNS(svgNamespace, "path");
    path1.setAttribute("d", "M4 18H20M4 6H20H4ZM4 12H20H4Z");
    path1.setAttribute("stroke", "#4A5568");
    path1.setAttribute("stroke-width", "2");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");

    path1.id = "menu_svg_path";
    svg.id = "menu_svg";
    svg.appendChild(path1);

    return svg;
  }
}
