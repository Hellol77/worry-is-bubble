export default class Title {
  constructor(title) {
    this.title = title;
  }

  render() {
    const h1 = document.createElement("h1");
    h1.id = "title";

    h1.textContent = this.title;
    return h1;
  }
}
