import { Plugin, ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_ZINCCHIRP = "zincchirp-view";

export default class Zincchirp extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_ZINCCHIRP, (leaf) => new ZincchirpView(leaf));

    this.addCommand({
      id: "open-zincchirp-view",
      name: "Open Zincchirp panel",
      callback: () => {
        this.activateView();
      },
    });
  }

  onunload() {}

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_ZINCCHIRP);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0] || null;
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: VIEW_TYPE_ZINCCHIRP, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }
}

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
    container.createEl("h4", { text: "Hello World" });
  }
}
