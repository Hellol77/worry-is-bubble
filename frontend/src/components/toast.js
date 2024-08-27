import { $ } from "../utils/querySelector";

export default class Toast {
  constructor() {}

  toastAnimation(toastContainer) {
    setTimeout(() => {
      toastContainer.classList.add("toast_mount_animation");
    }, 10); // 약간의 지연을 줘서 애니메이션이 제대로 실행되도록

    // 3초 후에 사라지는 애니메이션 추가 및 제거
    setTimeout(() => {
      toastContainer.classList.remove("toast_mount_animation");
      toastContainer.classList.add("toast_unmount_animation");

      // 애니메이션이 끝난 후 요소 제거
      toastContainer.addEventListener("animationend", () => {
        document.body.removeChild(toastContainer);
      });
    }, 1000);
  }

  render(message) {
    const toastContainer = document.createElement("div");
    toastContainer.className = "toast_container";

    const toast = document.createElement("div");
    toast.className = "toast";

    const toastMessage = document.createElement("span");
    toastMessage.className = "toast_message";
    toastMessage.textContent = message;

    toast.appendChild(this.warningIcon());
    toast.appendChild(toastMessage);
    toastContainer.appendChild(toast);

    $("body").appendChild(toastContainer);
    this.toastAnimation(toastContainer);
  }

  warningIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // path 요소 생성
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
    );
    path.setAttribute("stroke", "#E2584E");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    // SVG에 path 추가
    svg.appendChild(path);

    return svg;
  }
}
