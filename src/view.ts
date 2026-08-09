import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_ZINCCHIRP } from "./util";

export class ZincchirpView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_ZINCCHIRP;
  }

  getDisplayText() {
    return "Hello World";
  }

  async onOpen() {
    const container = this.contentEl;
    container.empty();
    container.createEl("h4", { text: "Zincchirp" });

    const wrapper = container.createDiv();
    const textarea = wrapper.createEl("textarea");
    textarea.style.width = "100%";
    const button = wrapper.createEl("button", { text: "Post" });

    button.addEventListener("click", () => {
      const post = textarea.value;
      textarea.value = "";
      new Notice(post);
    });
  }
}
