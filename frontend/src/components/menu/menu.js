export default class Menu {
  constructor() {}

  render() {
    const menuContainer = document.createElement("div");
    menuContainer.id = "menu_container";

    const menuContent = document.createElement("div");
    menuContent.id = "menu_content";

    const menuOl = document.createElement("ol");
    menuOl.id = "menu_ol";

    const profileFooter = document.createElement("footer");
    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/Hellol77";
    githubLink.target = "_blank";
    githubLink.appendChild(this.githubSvg());

    const instagramLink = document.createElement("a");
    instagramLink.href = "https://www.instagram.com/dhyeon_77/";
    instagramLink.target = "_blank";
    instagramLink.appendChild(this.instagramSvg());

    profileFooter.appendChild(githubLink);
    profileFooter.appendChild(instagramLink);

    const profileText = document.createElement("p");
    profileText.classList.add("profile_text");
    profileText.textContent = "Made by Hellol";
    profileFooter.appendChild(profileText);

    menuContent.appendChild(menuOl);
    menuContent.appendChild(profileFooter);
    menuContainer.appendChild(this.menuSvg());
    menuContainer.appendChild(menuContent);

    return menuContainer;
  }

  menuSvg() {
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

  githubSvg() {
    const SVG_NS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", SVG_NS);

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute(
      "d",
      "M11.9906 1.78748C6.19453 1.78513 1.5 6.47732 1.5 12.2687C1.5 16.8484 4.43672 20.7414 8.52656 22.1711C9.07734 22.3094 8.99297 21.9179 8.99297 21.6508V19.8344C5.8125 20.207 5.68359 18.1023 5.47031 17.7508C5.03906 17.0148 4.01953 16.8273 4.32422 16.4758C5.04844 16.1031 5.78672 16.5695 6.64219 17.8328C7.26094 18.7492 8.46797 18.5945 9.07969 18.4422C9.21328 17.8914 9.49922 17.3992 9.89297 17.0172C6.59766 16.4265 5.22422 14.4156 5.22422 12.025C5.22422 10.8648 5.60625 9.79841 6.35625 8.93826C5.87812 7.52029 6.40078 6.30623 6.47109 6.12576C7.83281 6.00388 9.24844 7.10076 9.35859 7.18748C10.132 6.97888 11.0156 6.86873 12.0047 6.86873C12.9984 6.86873 13.8844 6.98357 14.6648 7.19451C14.9297 6.99295 16.2422 6.05076 17.5078 6.1656C17.5758 6.34607 18.0867 7.53201 17.6367 8.93123C18.3961 9.79373 18.7828 10.8695 18.7828 12.032C18.7828 14.4273 17.4 16.4406 14.0953 17.0219C14.3784 17.3002 14.6031 17.6322 14.7564 17.9984C14.9098 18.3646 14.9886 18.7577 14.9883 19.1547V21.7914C15.007 22.0023 14.9883 22.2109 15.3398 22.2109C19.4906 20.8117 22.4789 16.8906 22.4789 12.2711C22.4789 6.47732 17.782 1.78748 11.9906 1.78748Z"
    );
    path.setAttribute("fill", "black");

    svg.appendChild(path);

    return svg;
  }

  instagramSvg() {
    const SVG_NS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", SVG_NS);

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute(
      "d",
      "M12 7.19368C9.33983 7.19368 7.19296 9.34056 7.19296 12.0007C7.19296 14.6609 9.33983 16.8077 12 16.8077C14.6601 16.8077 16.807 14.6609 16.807 12.0007C16.807 9.34056 14.6601 7.19368 12 7.19368ZM12 15.1249C10.2797 15.1249 8.87577 13.721 8.87577 12.0007C8.87577 10.2804 10.2797 8.8765 12 8.8765C13.7203 8.8765 15.1242 10.2804 15.1242 12.0007C15.1242 13.721 13.7203 15.1249 12 15.1249ZM17.0039 5.8765C16.3828 5.8765 15.8812 6.37806 15.8812 6.99915C15.8812 7.62025 16.3828 8.12181 17.0039 8.12181C17.625 8.12181 18.1266 7.62259 18.1266 6.99915C18.1267 6.85167 18.0978 6.7056 18.0415 6.56931C17.9851 6.43302 17.9024 6.30919 17.7981 6.2049C17.6939 6.10062 17.57 6.01793 17.4337 5.96158C17.2974 5.90522 17.1514 5.87631 17.0039 5.8765ZM21.3703 12.0007C21.3703 10.707 21.382 9.42493 21.3094 8.13353C21.2367 6.63353 20.8945 5.30228 19.7976 4.2054C18.6984 3.10618 17.3695 2.76634 15.8695 2.69368C14.5758 2.62103 13.2937 2.63275 12.0023 2.63275C10.7086 2.63275 9.42655 2.62103 8.13515 2.69368C6.63515 2.76634 5.3039 3.10853 4.20702 4.2054C3.1078 5.30462 2.76796 6.63353 2.6953 8.13353C2.62265 9.42728 2.63436 10.7093 2.63436 12.0007C2.63436 13.2921 2.62265 14.5765 2.6953 15.8679C2.76796 17.3679 3.11015 18.6992 4.20702 19.796C5.30624 20.8952 6.63515 21.2351 8.13515 21.3077C9.42889 21.3804 10.7109 21.3687 12.0023 21.3687C13.2961 21.3687 14.5781 21.3804 15.8695 21.3077C17.3695 21.2351 18.7008 20.8929 19.7976 19.796C20.8969 18.6968 21.2367 17.3679 21.3094 15.8679C21.3844 14.5765 21.3703 13.2945 21.3703 12.0007ZM19.3078 17.5273C19.1367 17.9538 18.9305 18.2726 18.6 18.6007C18.2695 18.9312 17.9531 19.1374 17.5266 19.3085C16.2937 19.7984 13.3664 19.6882 12 19.6882C10.6336 19.6882 7.7039 19.7984 6.47108 19.3109C6.04452 19.1398 5.72577 18.9335 5.39765 18.6031C5.06718 18.2726 4.86093 17.9562 4.68983 17.5296C4.20233 16.2945 4.31249 13.3671 4.31249 12.0007C4.31249 10.6343 4.20233 7.70462 4.68983 6.47181C4.86093 6.04525 5.06718 5.7265 5.39765 5.39837C5.72811 5.07025 6.04452 4.86165 6.47108 4.69056C7.7039 4.20306 10.6336 4.31322 12 4.31322C13.3664 4.31322 16.2961 4.20306 17.5289 4.69056C17.9555 4.86165 18.2742 5.0679 18.6023 5.39837C18.9328 5.72884 19.1391 6.04525 19.3101 6.47181C19.7976 7.70462 19.6875 10.6343 19.6875 12.0007C19.6875 13.3671 19.7976 16.2945 19.3078 17.5273Z"
    );
    path.setAttribute("fill", "#E50C9B");

    svg.appendChild(path);

    return svg;
  }
}
