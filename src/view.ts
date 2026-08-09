import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_ZINCCHIRP } from "./util";
import { ZincchirpModel } from "./model";

export class ZincchirpView extends ItemView {
  constructor(
    leaf: WorkspaceLeaf,
    private model: ZincchirpModel,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_ZINCCHIRP;
  }

  getDisplayText(): string {
    return "Zincchirp";
  }

  render() {
    // do nothing
  }

  async onOpen() {
    const container = this.contentEl;
    container.empty();
    container.createEl("h4", { text: "Zincchirp" });

    const wrapper = container.createDiv();
    const textarea = wrapper.createEl("textarea");
    textarea.style.width = "100%";
    const button = wrapper.createEl("button", { text: "Post" });

    button.addEventListener("click", async () => {
      const message = textarea.value;
      await this.model.post(message);
      textarea.value = "";
      textarea.focus();
    });

    container.createEl("hr");

    const dateInput = container.createEl("input", { type: "date" });
    dateInput.value = this.model.getDayString();
    dateInput.addEventListener("change", () => {
      this.model.setDayFromString(dateInput.value);
    });

    const openFile = container.createEl("button", { text: "Open File" });
    openFile.addEventListener("click", async () => {
      await this.model.openFile();
    });
  }
}
