import timeAgo from "../../utils/timeAgo";

export default class MenuText {
  constructor(id, text, createAt) {
    this.id = id;
    this.text = text;
    this.createAt = createAt;
  }

  render() {
    const li = document.createElement("li");
    li.classList.add("menu_li");
    const span = document.createElement("span");
    const p = document.createElement("p");
    span.textContent = timeAgo(new Date(this.createAt));
    span.classList.add("text_createAt");
    p.textContent = this.text;
    p.classList.add("text_small");
    li.classList.add("menu_bubble");
    li.id = this.id;
    li.appendChild(p);
    li.appendChild(span);

    return li;
  }
}
