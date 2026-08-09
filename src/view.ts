import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_ZINCCHIRP } from "./util";
import { ZincchirpModel } from "./model";

export class ZincchirpView extends ItemView {
  constructor(
    leaf: WorkspaceLeaf,
    private model: ZincchirpModel,
  ) {
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
      const message = textarea.value;
      this.model.post(message);
      textarea.value = "";
    });
  }
}
