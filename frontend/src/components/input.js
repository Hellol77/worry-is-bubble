export default class Input {
  constructor() {}

  render() {
    const input = document.createElement("input");
    input.id = "message_input";
    input.type = "text";
    input.placeholder = "고민을 입력해주세요!";

    const button = document.createElement("button");
    button.id = "message_submit_button";
    button.textContent = "입력";

    const div = document.createElement("div");
    div.appendChild(input);
    div.appendChild(button);

    div.className = "input_container";

    return div;
  }
}
